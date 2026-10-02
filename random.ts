//% color="#457B9D" icon="\uf074" block="QoL Random"
namespace QoLLibraries_Random {
    //% block="random character from custom set %customSet"
    //% blockId="qol_random_char_custom"
    //% category="Text"
    export function randomCharCustom(customSet: string): string {
        if (!customSet || customSet.length == 0) {
            customSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
        let idx = Math.randomRange(0, customSet.length - 1);
        return customSet.charAt(idx);
    }

    //% block="random character"
    //% blockId="qol_random_char"
    //% category="Text"
    export function randomChar(): string {
        return randomCharCustom("");
    }

    //% block="random true or false"
    //% blockId="qol_random_boolean"
    //% category="Logic"
    export function randomBoolean(): boolean {
        return Math.randomBoolean();
    }

    //% block="delete variable references for %variable"
    //% blockId="qol_delete_any_variable"
    //% category="Variables"
    export function deleteVariable(variable: any): void {
        // In JavaScript/TypeScript managed runtime environment, 
        // setting to null/undefined clears references for garbage collection.
        variable = null;
    }
}
