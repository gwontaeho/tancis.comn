import { useRef } from "react";
import { read, utils } from "xlsx";

export const useExcel2 = () => {
    const _file = useRef<any>();

    const importFile = (file: any) => {
        const { buffer } = file;

        const wb = read(buffer);
        /* SheetNames[0] get first worksheet */
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = utils.sheet_to_json(ws);
        const header = raw.shift() || {};

        const key = Object.keys(header);
        const label = Object.values(header);

        return raw;
    };

    const selectFile = async () => {
        return new Promise((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.onchange = async () => {
                if (!input.files) return;

                const file = input.files[0];
                const name = file.name;
                const buffer = await file.arrayBuffer();

                _file.current = { file, name, buffer };
                resolve({ file, name, buffer });
            };
            input.click();
        });
    };

    const getFile = () => {
        return _file.current;
    };

    return { selectFile, importFile, getFile };
};
