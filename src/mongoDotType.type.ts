import { Expand, FlattenUnion_shallow, objNotNever } from "./extras.type";
import { PickSubs_dotNotation } from "./PickSubs_dotNotation.type";


export type defaultDocFields = '_id' | '__v';
export type obj_defaultDocFields = { _id?: number, __v?: number };

/**
 * Picks subproperties of the given object with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
export type sub<T, arrIndeces extends number = never> = PickSubs_dotNotation<Required<FlattenUnion_shallow<T>>, arrIndeces>;
/**
 * Picks subproperties of the given object with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 * When `sub` fails with `type instantiation is excessively deep ...` error, this fails silently
 */
export type sub_noerror<T, arrIndeces extends number = never> = PickSubs_dotNotation<Required<FlattenUnion_shallow<T>>, arrIndeces> extends infer U ? U : never;


/**
 * Picks subproperties (& subelements) of 0th level deep (immediate properties)
 * almost an identity type generic
 */
export type sublvl0<T, arrIndeces extends number = never> = objNotNever<Partial<T>>;
/**
 * Picks subproperties (& subelements) of 1st level deep (subproperties and subelements) with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
export type sublvl1<T, arrIndeces extends number = never> = objNotNever<sub<T, arrIndeces>>;
/**
 * Picks subproperties (& subelements) of 2nd level deep (subsub-properties and -elements) with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
export type sublvl2<T, arrIndeces extends number = never> = objNotNever<sub<sub<T, arrIndeces>, arrIndeces>>;
/**
 * Picks subproperties (& subelements) of 3rd level deep (subsubsub-properties and -elements) with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
/** export type sublvl3<T, arrIndeces extends number = never> = objNotNever<sub<sublvl2<T, arrIndeces>, arrIndeces>>; */
/**
 * Picks subproperties (& subelements) of 4th level deep (subsubsubsub-properties and -elements) with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
/** export type sublvl4<T, arrIndeces extends number = never> = objNotNever<sub<sublvl3<T, arrIndeces>, arrIndeces>>; */
/**
 * Picks subproperties (& subelements) of 5th level deep (subsubsubsubsub-properties and -elements) with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
/** export type sublvl5<T, arrIndeces extends number = never> = objNotNever<sub<sublvl4<T, arrIndeces>, arrIndeces>>; */

/**
 * Converts into a type with all properties picked (optionally)
 * almost an identity type generic
 */
export type mongoDot_lvl0<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces>>>;
/**
 * Converts into a type with subproperties and subelements of up to 1 level deep with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
export type mongoDot_lvl1<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces>>>;
/**
 * Converts into a type with subproperties and subelements of up to 2 levels deep with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
export type mongoDot_lvl2<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces>>>;
/**
 * Converts into a type with subproperties and subelements of up to 3 levels deep with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
/** export type mongoDot_lvl3<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces> | sublvl3<T, arrIndeces>>>; */
/**
 * Converts into a type with subproperties and subelements of up to 4 levels deep with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
/** export type mongoDot_lvl4<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces> | sublvl3<T, arrIndeces> | sublvl4<T, arrIndeces>>>; */
/**
 * Converts into a type with subproperties and subelements of up to 5 levels deep with dot notation
 * If `arrIndeces` is provided, uses all these indeces to pick elements of array properties of the given object with dot notation
 */
/** export type mongoDot_lvl5<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces> | sublvl3<T, arrIndeces> | sublvl4<T, arrIndeces> | sublvl5<T, arrIndeces>>>; */
