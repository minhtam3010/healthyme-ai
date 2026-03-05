import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Custom hook that provides a containerRef to wrap the capturable area
 * and a handleExportPDF function that:
 *  - Temporarily expands the exercise grid (via setShowAll) before capture
 *  - Waits for fonts and React re-render
 *  - Captures with html2canvas (Arial override to fix web-font spacing)
 *  - Splits the canvas into A4 pages, snapping cuts to card / row boundaries
 *  - Restores the expand state after saving
 */
export function useExportPDF(
  setShowAll: (v: boolean) => void,
  showAll: boolean,
) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!containerRef.current) return;

    // Expand exercise to grid view so all 7 days appear in the PDF
    const wasExpanded = showAll;
    setShowAll(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      await document.fonts.ready;

      const canvas = await html2canvas(containerRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "white",
        // Replace web font with system Arial in the clone to fix word-spacing issues
        onclone: (_doc, element) => {
          element.style.fontFamily = "Arial, sans-serif";
          element.querySelectorAll<HTMLElement>("*").forEach((el) => {
            el.style.fontFamily = "Arial, sans-serif";
            el.style.letterSpacing = "normal";
            el.style.wordSpacing = "normal";
          });
        },
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const captureScale = 2;
      const pageHeightPx = (pdfPageHeight * canvas.width) / pdfWidth;

      // ── Collect safe page-break points ────────────────────────────────────
      // Snap page cuts to the nearest boundary at or before the A4 limit:
      //   • Bottom of every .ant-card  → break between sections
      //   • Bottom of every [data-pdf-row] → break between exercise grid rows
      const containerRect = containerRef.current.getBoundingClientRect();
      const safeSet = new Set<number>([0, canvas.height]);

      containerRef.current
        .querySelectorAll<HTMLElement>(".ant-card")
        .forEach((el) => {
          const px = Math.round(
            (el.getBoundingClientRect().bottom - containerRect.top) *
              captureScale,
          );
          if (px > 0 && px < canvas.height) safeSet.add(px);
        });

      containerRef.current
        .querySelectorAll<HTMLElement>("[data-pdf-row]")
        .forEach((el) => {
          const px = Math.round(
            (el.getBoundingClientRect().bottom - containerRect.top) *
              captureScale,
          );
          if (px > 0 && px < canvas.height) safeSet.add(px);
        });

      const safeBreaks = [...safeSet].sort((a, b) => a - b);

      // ── Slice canvas into A4 pages ─────────────────────────────────────────
      const addSlice = (start: number, end: number, idx: number) => {
        if (idx > 0) pdf.addPage();
        const sliceH = end - start;
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext("2d");
        ctx?.drawImage(
          canvas,
          0,
          start,
          canvas.width,
          sliceH,
          0,
          0,
          canvas.width,
          sliceH,
        );
        pdf.addImage(
          sliceCanvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          pdfWidth,
          (sliceH * pdfWidth) / canvas.width,
        );
      };

      let pageStart = 0;
      let pageIdx = 0;
      while (pageStart < canvas.height) {
        const idealEnd = pageStart + pageHeightPx;
        if (idealEnd >= canvas.height) {
          addSlice(pageStart, canvas.height, pageIdx);
          break;
        }
        // Find closest safe break AT OR BEFORE the A4 boundary
        let breakAt = idealEnd;
        for (let j = safeBreaks.length - 1; j >= 0; j--) {
          if (safeBreaks[j] <= idealEnd && safeBreaks[j] > pageStart) {
            breakAt = safeBreaks[j];
            break;
          }
        }
        addSlice(pageStart, breakAt, pageIdx);
        pageStart = breakAt;
        pageIdx++;
      }

      pdf.save("health-plan.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setShowAll(wasExpanded);
    }
  };

  return { containerRef, handleExportPDF };
}

// Re-export useState so WeeklyExercise can share its toggle with the parent
export { useState };
