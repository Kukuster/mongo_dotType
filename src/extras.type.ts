export type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};

export type XOR<T, U> = T | U extends Record<string | number, unknown> ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type XOR3<T1, T2, T3> = XOR<T1, XOR<T2, T3>>;
export type XOR4<T1, T2, T3, T4> = XOR<T1, XOR3<T2, T3, T4>>;
export type XOR5<T1, T2, T3, T4, T5> = XOR<T1, XOR4<T2, T3, T4, T5>>;
export type XOR6<T1, T2, T3, T4, T5, T6> = XOR<T1, XOR5<T2, T3, T4, T5, T6>>;
export type XOR7<T1, T2, T3, T4, T5, T6, T7> = XOR<T1, XOR6<T2, T3, T4, T5, T6, T7>>;
export type XOR8<T1, T2, T3, T4, T5, T6, T7, T8> = XOR<T1, XOR7<T2, T3, T4, T5, T6, T7, T8>>;
export type XOR9<T1, T2, T3, T4, T5, T6, T7, T8, T9> = XOR<T1, XOR8<T2, T3, T4, T5, T6, T7, T8, T9>>;



/**
 * Convert possible never to an empty object
 */
export type objNotNever<T> = [T] extends [never] ? {} : T;
/**
 * Convert possible never to undefined
 */
export type undefinedNotNever<T> = [T] extends [never] ? undefined : T;
/**
 * Equal by extending each other
 */
export type Equals<A, B, Y, N> =
    A extends B ?
        B extends A ? 
            Y : N
        : N;

/**
 * Returns an interface stripped of all keys that don't resolve to U, defaulting 
 * to a non-strict comparison of T[key] extends U. Setting B to true performs
 * a strict type comparison of T[key] extends U & U extends T[key]
 */
export type KeysOfType<T, U, B = false> = {
    [P in keyof T]: B extends true 
        ? T[P] extends U 
            ? (U extends T[P] 
                ? P 
                : never)
            : never
        : T[P] extends U 
            ? P 
            : never;
}[keyof T];

export type PickByType<T, U, B = false> = Pick<T, KeysOfType<T, U, B>>;



/**
 * expands object types one level deep
 */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/**
 * expands object types recursively
 */
export type ExpandRecursively<T> = T extends object
    ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
    : T;


/**
 * Converts a union of two types into an intersection
 * i.e. A | B -> A & B
 */
export type UnionToIntersection<U> = (U extends any
    ? (k: U) => void
    : never) extends ((k: infer I) => void)
    ? I
    : never;

/**
 * Flattens two union types into a single type with optional values
 * i.e. FlattenUnion<{ a: number, c: number } | { b: string, c: number }> = { a?: number, b?: string, c: number }
 */
export type FlattenUnion<T> = {
    [K in keyof UnionToIntersection<T>]: K extends keyof T ?
    T[K] extends any[] ? T[K]
    : T[K] extends object ? FlattenUnion<T[K]>
    : T[K]
    : UnionToIntersection<T>[K] | undefined
}

/**
 * Flattens two union types into a single type with optional values, checking only for immediate properties
 * i.e. FlattenUnion<{ a: number, c: number } | { b: string, c: number }> = { a?: number, b?: string, c: number }
 */
export type FlattenUnion_shallow<T> = {
    [K in keyof UnionToIntersection<T>]: K extends keyof T ? T[K]
        : UnionToIntersection<T>[K] | undefined
}




/**
 * Returns type of an element of the given Array
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];





/**
 * Returns the same type but with all properties assignable to a primitive type changed to undefined type
 */
export type nonPrimitiveObject<T> = T extends string | number | symbol | boolean | bigint | null ? never : T;
export type primitiveObject<T>    = T extends string | number | symbol | boolean | bigint | null | undefined ? T : never;

/**
 * Returns the same type but with all properties assignable to a primitive type changed to undefined type
 */
export type Nullable<T> = T extends undefined | null ? T : never;

/**
 * Returns the same type but with all properties assignable to a primitive type changed to undefined type
 */
export type nonPrimitiveNonArrayObject<T> = T extends Array<any> | string | number | symbol | boolean | bigint | null | Date ? never : T;
export type primitiveOrArrayObject<T>     = T extends Array<any> | string | number | symbol | boolean | bigint | null | undefined | Date ? T : never;

/**
 * Returns the same type but with all properties assignable to a primitive type changed to undefined type
 */
export type nonArrayObject<T> = T extends unknown[] ? never : T;
export type arrayObject<T>  =   T extends unknown[] ? T : never;



/**
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type excludePrimitiveAndArrayProperties<T> = Omit<
    T,
    NonNullable<KeysOfType<
        { [key in keyof Required<T>]: nonPrimitiveNonArrayObject<Required<T>[key]> },
        never | undefined | null
    >>
    >;
// Looks better, but executes slower
export type excludePrimitiveAndArrayProperties_alt<T> = { [P in keyof T as T[P] extends primitiveOrArrayObject<T[P]> ? never : P]: T[P] };;

/**
 * Exclude Primitive Properties.
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type ExclPrmtvAndArr<T> = excludePrimitiveAndArrayProperties<T>;



/**
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type excludePrimitiveProperties<T> = Omit<
    T,
    NonNullable<KeysOfType<
        { [key in keyof Required<T>]: nonPrimitiveObject<Required<T>[key]> },
        never | undefined | null
    >>
    >;
// Looks better, but executes slower
export type excludePrimitiveProperties_alt<T> = { [P in keyof T as T[P] extends primitiveObject<T[P]> ? never : P]: T[P] };

/**
 * Exclude Primitive Properties.
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type ExclPrmtv<T> = excludePrimitiveProperties<T>;



/**
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type excludeNullableProperties<T> = { [P in keyof T as T[P] extends null | undefined | never ? never : P]: T[P] };

/**
 * Exclude Primitive Properties.
 * Returns an interface based on given but with all properties that resolve to a primitive type excluded
 */
export type ExclNullable<T> = excludeNullableProperties<T>;



/**
 * Returns an interface based on given but only with all properties that resolve to an array type
 */
export type leaveArrayProperties<T> = Omit<
    T,
    NonNullable<KeysOfType<
        { [key in keyof Required<T>]: arrayObject<Required<T>[key]> },
        never | undefined | null
    >>
>;

/**
 * Returns an interface based on given but only with all properties that resolve to an array type
 */
export type leaveArrayPropertiessElements<T> = ExclNullable<{
    [P in keyof T]: NonNullable<T[P]> extends unknown[] ? NonNullable<T[P]>[number] : never;
}>;

/**
 * Leave Only Array Properties.
 * Returns an interface based on given but only with all properties that resolve to an array type
 */
export type ArrProps<T> = leaveArrayProperties<T>;

