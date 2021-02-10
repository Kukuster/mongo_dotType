# mongo_dotType

TypeScript (v4.1+) types for using <a href="https://docs.mongodb.com/manual/core/document/#document-dot-notation">mongoDB dot notation</a> while querying mongo documents.

## How to use

*Install*

```bash
npm install mongo_dottype --save-dev
```

*Use*

```TypeScript
import { mongoDot_lvl2 } from "mongo_dottype";

interface Users {
    /* ... */
}

// If you don't need array indices for "array element dot notation"
type Users_dotNotation_a = mongoDot_lvl2<Users>;

// If you need some array indices to work, i.e. for the first two elements
type Users_dotNotation_b = mongoDot_lvl2<Users, 0|1>;

// Although allowed, by the TypeScript v4.1.4 type inference for this case is practically not supported (see the bottom section)
type Users_dotNotation_c = mongoDot_lvl2<Users, number>;
```
<br>

## Quick example:

<details>
    <summary>Doc1.ts</summary>
  
```TypeScript
import { mongoDot_lvl2 } from "mongo_dottype";

export interface Doc1 {
    prop1: string,
    prop2: {
        sp21:  string,
        sp22?: number,
    },
    prop3: number,
    prop4: {
        sp41: string,
        sp42: number,
    },
    prop5: string[];
};


export type Doc1_mongoDot = mongoDot_lvl2<Doc1, 0|1|2>;
//
// the type resolves to:
//
type Doc1_mongoDot = {
    _id?: number;
    __v?: number;
    prop1?: string;
    prop2?: {
        sp21: string;
        sp22?: number;
    };
    "prop2.sp21"?: string;
    "prop2.sp22"?: number;
    prop3?: number;
    prop4?: {
        sp41: string;
        sp42: number;
    };
    "prop4.sp41"?: string;
    "prop4.sp42"?: number;
    prop5?: string[];
    "prop5.0"?: string;
    "prop5.1"?: string;
    "prop5.2"?: string;
}


```
</details>

<br>

## Longer example:

<details>
    <summary>Doc2.ts</summary>

```TypeScript
export interface Doc2 {
    prop1: string,
    prop2: {
        sp21: string,
        sp22: number,
        sp23: {
            sp23el_prop1: number,
            sp23el_prop2?: string,
        }[],
        sp24?: {
            ssp241: string,
            ssp242?: boolean,
        }
    },
    prop3: number,
    prop4: {
        sp41: string,
        sp42: number,
    },
    prop5: string[];
    prop6: {
        prop6el_prop1: string,
        prop6el_prop2?: number,
    }[];
    prop7?: string[];
};


export type Doc2_mongoDot = mongoDot_lvl2<Doc2, 0|1|2>;
//
// the type resolves to:
//
type Doc2_mongoDot = {
    _id?: number;
    __v?: number;
    prop1?: string;
    prop2?: {
        sp21: string;
        sp22: number;
        sp23: {
            sp23el_prop1: number;
            sp23el_prop2?: string;
        }[];
        sp24?: {
            ssp241: string;
            ssp242?: boolean;
        };
    };
    "prop2.sp21"?: string;
    "prop2.sp22"?: number;
    "prop2.sp23"?: {
        sp23el_prop1: number;
        sp23el_prop2?: string;
    }[];
    "prop2.sp23.0"?: {
        sp23el_prop1: number;
        sp23el_prop2?: string;
    };
    "prop2.sp23.1"?: {
        sp23el_prop1: number;
        sp23el_prop2?: string;
    };
    "prop2.sp23.2"?: {
        sp23el_prop1: number;
        sp23el_prop2?: string;
    };
    "prop2.sp24"?: {
        ssp241: string;
        ssp242?: boolean;
    };
    "prop2.sp24.ssp241"?: string;
    "prop2.sp24.ssp242"?: boolean;
    prop3?: number;
    prop4?: {
        sp41: string;
        sp42: number;
    };
    "prop4.sp41"?: string;
    "prop4.sp42"?: number;
    prop5?: string[];
    "prop5.0"?: string;
    "prop5.1"?: string;
    "prop5.2"?: string;
    prop6?: {
        prop6el_prop1: string;
        prop6el_prop2?: number;
    }[];
    "prop6.0"?: {
        prop6el_prop1: string;
        prop6el_prop2?: number;
    };
    "prop6.0.prop6el_prop1"?: string;
    "prop6.0.prop6el_prop2"?: number;
    "prop6.1"?: {
        prop6el_prop1: string;
        prop6el_prop2?: number;
    };
    "prop6.1.prop6el_prop1"?: string;
    "prop6.1.prop6el_prop2"?: number;
    "prop6.2"?: {
        prop6el_prop1: string;
        prop6el_prop2?: number;
    };
    "prop6.2.prop6el_prop1"?: string;
    "prop6.2.prop6el_prop2"?: number;
    prop7?: string[];
    "prop7.0"?: string;
    "prop7.1"?: string;
    "prop7.2"?: string;
}

```
</details>


<br>



## Deepness and performance
The package provides only with types for subproperties up to 2 levels deep, i.e.:
```TypeScript
// from
{
    prop2: {
        sp24: {
            ssp241: string;
        };
    };
}
// to
{
    "prop2.sp24.ssp241"?: string;
}
```
But you can still define deeper levels yourself (3rd, 4th, maybe 5th) by copying commented definitions from the `mongoDotType.type.d.ts` file.

These definitions were left commented intentionally though.

Starting with level 3, simply having such high level type alias definition can cause TS compiler to run slower.

Starting with level 4, in some cases TypeScript fails to instantiate a type producing the error:
`Type instantiation is excessively deep and possibly infinite. ts(2589)`

You are unlikely to make level 5 work at all. If you do, more power to you!



<br>

## Even longer example (using mongoose):

**_Say you create a mongoose model:_**

<details>
  <summary>Doc3.model.ts</summary>
  
  ```TypeScript
import { Document, model, Schema } from "mongoose";


export interface Doc3 {
    prop1: string,
    prop2: {
        sp21: string,
        sp22?: number,
        sp23: {
            ssp23el_prop1: number,
            ssp23el_prop2?: string,
        }[],
    },
    prop3: number,
    prop4: {
        sp41: string,
        sp42: number,
        sp43: number[];
        sp44: {
            ssp441: number,
            ssp442: string,
            ssp443: {
                sssp4431: string,
                sssp4432: number,
                sssp4433: number,
            },
        }
    },
    prop5: string[];
    prop6: {
        prop6el_prop1: string,
        prop6el_prop2?: number,
        prop6el_prop3?: {
            prop6el_prop3el_prop1: string,
            prop6el_prop3el_prop2: number,
            prop6el_prop3el_prop3: {
                prop6el_prop3el_sp31: number,
                prop6el_prop3el_sp32: string,
                prop6el_prop3el_sp33: string[],
            },
        }[],
    }[];
    prop7?: string[];
};


const Doc3Schema = new Schema({
    prop1: { type: String, required: true, unique: false, },
    prop2: {
        type: {
            sp21: { type: String, required: true, unique: false, },
            sp22: { type: Number, required: false, unique: false, },
            sp23: {
                type: [{
                    ssp23el_prop1: { type: Number, required: true, unique: false, },
                    ssp23el_prop2: { type: String, required: false, unique: false, },
                }],
                required: true, unique: false,
            },
        },
        required: true, unique: false,
    },
    prop3: { type: Number, required: true, unique: false, },
    prop4: {
        type: {
            sp41: { type: String, required: true, unique: false, },
            sp42: { type: Number, required: true, unique: false, },
            sp43: { type: [Number], required: true, unique: false, },
            sp44: {
                type: {
                    ssp441: { type: Number, required: true, unique: false, },
                    ssp442: { type: String, required: true, unique: false, },
                    ssp443: {
                        type: {
                            sssp4431: { type: String, required: true, unique: false, },
                            sssp4432: { type: Number, required: true, unique: false, },
                            sssp4433: { type: Number, required: true, unique: false, },
                        },
                        required: true, unique: false,
                    },
                },
                required: true, unique: false,
            },
        },
        required: true, unique: false,
    },
    prop5: { type: [String], required: true, unique: false, },
    prop6: {
        type: [{
            prop6el_prop1: { type: String, required: true, unique: false, },
            prop6el_prop2: { type: Number, required: false, unique: false, },
            prop6el_prop3: {
                type: [{
                    prop6el_prop3el_prop1: { type: String, required: true, unique: false, },
                    prop6el_prop3el_prop2: { type: Number, required: true, unique: false, },
                    prop6el_prop3el_prop3: {
                        type: {
                            prop6el_prop3el_sp31: { type: Number, required: true, unique: false, },
                            prop6el_prop3el_sp32: { type: String, required: true, unique: false, },
                            prop6el_prop3el_sp33: { type: [String], required: true, unique: false, },
                        },
                        required: true, unique: false,
                    },
                }],
                required: false, unique: false,
            },
        }],
        required: true, unique: false,
    },
    prop7: { type: [String], required: false, unique: true, },
});


export type Doc3_document = Doc3 & Document;

export default model<Doc3_document>('Doc3', Doc3Schema);

```
</details>

<br>

**_Define the type generic for dot notation up to 3 lvl deep:_**

<details>
    <summary>mongoDot_deeper.ts</summary>
  
  ```TypeScript
import { mongoDot_lvl2, obj_defaultDocFields, sub, sublvl0, sublvl1, sublvl2 } from "mongo_dottype";
import { Expand, FlattenUnion_shallow, objNotNever } from "mongo_dottype/dist/extras.type";

/**
 * Picks subproperties (& subelements) of 3rd level deep (subsubsub-properties and -elements) with dot notation
 * If `arrIndices` is provided, uses all these indices to pick elements of array properties of the given object with dot notation
 */
 export type sublvl3<T, arrIndices extends number = never> = objNotNever<sub<sublvl2<T, arrIndices>, arrIndices>>; 
/**
 * Converts into a type with subproperties and subelements of up to 3 levels deep with dot notation
 * If `arrIndices` is provided, uses all these indices to pick elements of array properties of the given object with dot notation
 */
 export type mongoDot_lvl3<T, arrIndices extends number = never> = Expand<FlattenUnion_shallow<obj_defaultDocFields | sublvl0<T, arrIndices> | sublvl1<T, arrIndices> | sublvl2<T, arrIndices> | sublvl3<T, arrIndices>>>;

```
  
</details>

<br>

**_Then, the recommended usage by default would be the following:_**

<details>
    <summary>FindDocs3.ts</summary>
  
```TypeScript
import Doc3Model, { Doc3 } from "./Doc3.model";
import { FilterQuery } from "mongoose";

export async function FindDocs3(filter: FilterQuery<Required<mongoDot_lvl3<Doc3, 0|1|2>>>, select?: string): Promise<Doc3[]> {
    return Doc3Model.find(filter).select(select).exec();
}

```
</details>

<details>
    <summary>queryDoc3_example.ts</summary>
  
```TypeScript
import { mongoDot_lvl3 } from "./mongoDot_deeper";
import { FindDocs3 } from "./FindDocs3.ts";


(async () => {
    const DB = await DBconnection;



    ///// Test 1 (OK) /////
    (Doc3Model as Model<mongoDot_lvl3<Doc3, 0> & Document>).updateMany({
        "prop4.sp43.0": {
            $in: [0, 1],
        }
    },
    {
        $push: {
            "prop2.sp23": {
                ssp23el_prop1: 3,
                ssp23el_prop2: 'foobar'
            },
            "prop4.sp43": {
                $each: [2, 3, 4]
            },
        }
    }).exec();
    
    
    
    ///// Test 2 (ERROR) /////
    (Doc3Model as Model<mongoDot_lvl3<Doc3, 0> & Document>).updateMany({
        "prop4.sp43.0": {
            $in: [0, 1],
        }
    },
    {
        $push: {
            "prop2.sp23": {
                ssp23el_prop1: 3,
                ssp23el_prop2: 'foobar'
            },
            "prop4.sp43": {
                $each: [2, 3, "four"] // <-- Type 'string' is not assignable to type 'number'. ts(2322)
            },
        }
    }).exec();
    
    
    
    ///// Test 3 (OK) /////
    FindDocs3({
        "prop6.0.prop6el_prop3.2": {
            $ne: {
                prop6el_prop3el_prop1: "foo",
                prop6el_prop3el_prop2: 100,
                prop6el_prop3el_prop3: {
                    prop6el_prop3el_sp31: 200,
                    prop6el_prop3el_sp32: "BAR",
                    prop6el_prop3el_sp33: [],
                }
            }
        }
    });
    
    
    
    ///// Test 4 (ERROR) /////
    FindDocs3({
        "prop6.0.prop6el_prop3.2": {
            $ne: {
                prop6el_prop3el_prop1: "foo",
                prop6el_prop3el_prop2: 100,
                prop6el_prop3el_prop3: {
                    prop6el_prop3el_sp31: 200,
                    prop6el_prop3el_sp32: [], // <-- Type 'undefined[]' is not assignable to type 'string'. ts(2322)
                    prop6el_prop3el_sp33: [],
                }
            }
        }
    });
    
    
    

    return await DB.disconnect();
})();


```
</details>

<br>


## Using `number` type for allowed array indices
This type alias:
```TypeScript
type Users_dotNotation = mongoDot_lvl2<Users, number>;
```
will result in a type with object keys of type ``` `somestring${number}` ```.

If you explicitly try to use this type literal (``` `prop.${number}` ```) to index an object, 
TSC may produce an error: ```"`prop.${number}` cannot be used to index type ..."```.
But when calculated for the type aliases provided here, such a situation, instead of an error, "silently" produces either type `never` or, weirdly enough, `undefined` in place of an object that you're trying to index.

By the time I'm writing it, using `number` practically doesn't work. Although the TS calculations seem to work out correctly, the key part, the type checking, simply isn't supported for type literals as object keys by now.
You can play around with the `PickSubs_dotNotation` type, as this is where (almost) all the magic happens.
I will be submitting a GitHub issue to TypeScript regarding usage of `somestring${number}` for indexing objects.



