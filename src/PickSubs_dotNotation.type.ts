import { ExclPrmtvAndArr, ArrProps, ExclPrmtv, objNotNever } from "./extras.type";


/**
 * Picks the properties of non-primitive properties of S
 */
export type PickSubproperties<S> = {
    [K in keyof Required<ExclPrmtvAndArr<S>> & string]: {
        [P in keyof Required<ExclPrmtvAndArr<S>>[K] & string]:
        { [key in P]?: Required<ExclPrmtvAndArr<S>>[K][P] };
    }[keyof Required<ExclPrmtvAndArr<S>>[K] & string];
}[keyof Required<ExclPrmtvAndArr<S>> & string];

/**
 * Picks the properties of non-primitive properties of S (with dot notation)
 */
export type PickSubproperties_dotNotation<S> = {
    [K in keyof Required<ExclPrmtvAndArr<S>> & string]: {
        [P in keyof Required<ExclPrmtvAndArr<S>>[K] & string]:
        { [key in `${K}.${P}`]?: Required<ExclPrmtvAndArr<S>>[K][P] };
    }[keyof Required<ExclPrmtvAndArr<S>>[K] & string];
}[keyof Required<ExclPrmtvAndArr<S>> & string];



/**
 * Picks the elements of array properties of S
 */
export type PickSubelements<S extends {[K in string]?: any} = {[K in string]?: any}, aS extends ArrProps<Required<S>> = ArrProps<Required<S>>> = {
    [K in keyof aS & string]: {
        [key in K]?: aS[K][number]
    };
}[keyof aS & string];

/**
 * Picks the elements of array properties of S (with dot notation)
 */
export type PickSubelements_dotNotation<S extends {[K in string]?: any} = {[K in string]?: any}, allowedNums extends number = number, aS extends ArrProps<Required<S>> = ArrProps<Required<S>>> = {
    [K in keyof aS & string]: {
        [key in `${K}.${allowedNums}`]?: aS[K][number]
    }
}[keyof aS & string];



/**
 * Picks the properties of non-primitive properties of S and elements of array properties of S (with dot notation)
 */
export type PickSubs_dotNotation<S, allowedNums extends number = number, Snp extends Required<ExclPrmtv<S>> = Required<ExclPrmtv<S>>> = {
    [K in keyof Snp & string]:
        Snp[K] extends unknown[] ? objNotNever<{
            [key in `${K}.${allowedNums}`]?: Snp[K][number]
        }> : {
            [P in keyof Snp[K] & string]:
            { [key in `${K}.${P}`]?: Snp[K][P] };
        }[keyof Snp[K] & string];
}[keyof Snp & string];


