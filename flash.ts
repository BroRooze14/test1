//% color="#E76F51" icon="\uf0a0" block="Flash Memory"
namespace QoLLibraries_Flash {
    //% block="save %value to flash variable %name"
    //% blockId="qol_flash_write"
    export function flashWrite(name: string, value: string): void {
        settings.writeString("qol_" + name, value);
    }

    //% block="read flash variable %name"
    //% blockId="qol_flash_read"
    export function flashRead(name: string): string {
        return settings.readString("qol_" + name) || "";
    }

    //% block="delete flash variable %name"
    //% blockId="qol_flash_delete"
    export function flashDelete(name: string): void {
        settings.remove("qol_" + name);
    }

    //% block="reset flash variable %name"
    //% blockId="qol_flash_reset"
    export function flashReset(name: string): void {
        settings.writeString("qol_" + name, "");
    }

    //% block="completely clear saved flash memory"
    //% blockId="qol_flash_clear_all"
    export function flashClearAll(): void {
        let keys = settings.list("qol_");
        for (let key of keys) {
            settings.remove(key);
        }
    }
}
