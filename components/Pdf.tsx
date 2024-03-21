// @ts-nocheck
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import * as worker from "pdfjs-dist/build/pdf.worker.mjs";
import { useRef } from "react";

export const Pdf = () => {
    const ref = useRef({
        pdfDoc: null,
        pageRendering: false,
        canvas: null,
        ctx: null,
        scale: 0.8,
        pageNum: 1,
        numPages: 1,
    });

    const renderPage = (num) => {
        if (!ref.current.pdfDoc) return;
        if (ref.current.pageRendering) return;

        ref.current.pageRendering = true;

        ref.current.pdfDoc.getPage(num).then((page) => {
            const viewport = page.getViewport({ scale: ref.current.scale });
            ref.current.canvas.height = viewport.height;
            ref.current.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ref.current.ctx,
                viewport: viewport,
            };

            const renderTask = page.render(renderContext);
            renderTask.promise.then(() => {
                ref.current.pageRendering = false;
            });
        });
    };

    const handleClickPrev = () => {
        if (ref.current.pageNum === 1) return;
        ref.current.pageNum--;
        renderPage(ref.current.pageNum);
    };

    const handleClickNext = () => {
        if (ref.current.pageNum === ref.current.numPages) return;
        ref.current.pageNum++;
        renderPage(ref.current.pageNum);
    };

    const handleChange = async (e: any) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            console.log(file);
            const buffer = await file.arrayBuffer();
            GlobalWorkerOptions.workerSrc = worker;
            const pdf = getDocument({ data: buffer });

            pdf.promise.then((pdfDoc: any) => {
                ref.current.pdfDoc = pdfDoc;
                ref.current.numPages = pdfDoc.numPages;
                renderPage(1);
            });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleClickPrev}>prev</button>
            <button onClick={handleClickNext}>next</button>
            <canvas
                ref={(node) => {
                    if (!node) return;
                    if (ref.current.canvas) return;
                    ref.current.canvas = node;
                    ref.current.ctx = node.getContext("2d");
                }}
            />
        </div>
    );
};
