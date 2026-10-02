//% color="#2A9D8F" icon="\uf00a" block="Grids"
namespace QoLLibraries_Grid {
    export class Grid {
        maxSize: number;
        defaultVal: any;
        defaultSize: number;
        data: { [key: string]: any };

        constructor(maxSize: number, defaultVal: any, defaultSize: number) {
            this.maxSize = maxSize;
            this.defaultVal = defaultVal !== undefined ? defaultVal : " ";
            this.defaultSize = defaultSize > 0 ? defaultSize : 5;
            this.data = {};
        }
    }

    //% block="create new grid with max size %maxSize default value %defaultVal default size %defaultSize"
    //% blockId="qol_create_grid"
    //% blockSetVariable=myGrid
    export function createGrid(maxSize: number, defaultVal: any, defaultSize: number): Grid {
        return new Grid(maxSize, defaultVal, defaultSize);
    }

    //% block="set grid cell %grid X %x Y %y to %value"
    //% blockId="qol_set_grid_cell"
    export function setGridCell(grid: Grid, x: number, y: number, value: any): void {
        if (!grid) return;
        if (x < 0 || y < 0) {
            serial.writeLine("Cell address cant be under 0");
            return;
        }
        if (grid.maxSize > 0 && (x >= grid.maxSize || y >= grid.maxSize)) {
            serial.writeLine("Out of set max grid range.");
            return;
        }
        let key = x + "," + y;
        grid.data[key] = value;
    }

    //% block="get grid cell %grid X %x Y %y"
    //% blockId="qol_get_grid_cell"
    export function getGridCell(grid: Grid, x: number, y: number): any {
        if (!grid) return " ";
        if (x < 0 || y < 0) {
            serial.writeLine("Cell address cant be under 0");
            return " ";
        }
        let key = x + "," + y;
        if (grid.data[key] !== undefined) {
            return grid.data[key];
        }
        return grid.defaultVal;
    }

    //% block="reset grid %grid"
    //% blockId="qol_reset_grid"
    export function resetGrid(grid: Grid): void {
        if (!grid) return;
        grid.data = {};
    }

    //% block="write grid %grid to serial"
    //% blockId="qol_serial_write_grid"
    export function writeGridToSerial(grid: Grid): void {
        if (!grid) return;
        let size = grid.defaultSize;
        // Determine dynamic size based on keys if larger than default
        for (let key of Object.keys(grid.data)) {
            let parts = key.split(",");
            let px = parseInt(parts[0]);
            let py = parseInt(parts[1]);
            if (px >= size) size = px + 1;
            if (py >= size) size = py + 1;
        }
        if (grid.maxSize > 0 && size > grid.maxSize) {
            size = grid.maxSize;
        }

        for (let y = 0; y < size; y++) {
            let row = "";
            for (let x = 0; x < size; x++) {
                let key = x + "," + y;
                let val = grid.data[key] !== undefined ? grid.data[key] : grid.defaultVal;
                row += val + "\t";
            }
            serial.writeLine(row);
        }
    }
}
