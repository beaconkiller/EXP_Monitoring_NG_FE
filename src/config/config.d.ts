declare module './config.ts' {
    export const config: {
        env_prod: any;
        env_dev: any;
    };

    export function someUtilityFunction(param: string): string;
}
