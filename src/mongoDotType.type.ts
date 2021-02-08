import { Expand, FlattenUnion_shallow, objNotNever } from "./extras.type";
import { PickSubs_dotNotation } from "./PickSubs_dotNotation.type";


export type defaultDocFields = '_id' | '__v';
export type obj_defaultDocFields = { _id?: number, __v?: number };


export type sub<T, arrIndeces extends number = never> = PickSubs_dotNotation<Required<FlattenUnion_shallow<T>>, arrIndeces>;
export type sub_noerror<T, arrIndeces extends number = never> = PickSubs_dotNotation<Required<FlattenUnion_shallow<T>>, arrIndeces> extends infer U ? U : never;

export type sublvl0<T, arrIndeces extends number = never> = objNotNever<Partial<T>>;
export type sublvl1<T, arrIndeces extends number = never> = objNotNever<sub<T, arrIndeces>>;
export type sublvl2<T, arrIndeces extends number = never> = objNotNever<sub<sub<T, arrIndeces>, arrIndeces>>;
// export type sublvl3<T, arrIndeces extends number = never> = objNotNever<sub<sublvl2<T, arrIndeces>, arrIndeces>>;
// export type sublvl4<T, arrIndeces extends number = never> = objNotNever<sub<sublvl3<T, arrIndeces>, arrIndeces>>;


export type mongoDot_lvl0<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces>>>;
export type mongoDot_lvl1<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces>>>;
export type mongoDot_lvl2<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces>>>;
// export type mongoDot_lvl3<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces> | sublvl3<T, arrIndeces>>>;
// export type mongoDot_lvl4<T, arrIndeces extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndeces> | sublvl1<T, arrIndeces> | sublvl2<T, arrIndeces> | sublvl3<T, arrIndeces> | sublvl4<T, arrIndeces>>>;

