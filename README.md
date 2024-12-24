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




## I accept donations!

### Paypal

<p>
<!--   <a href="https://www.paypal.com/donate/?hosted_button_id=485PXFAM75G4E">
      <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" alt="paypal">
  </a> -->
  <a href="https://www.paypal.com/donate/?hosted_button_id=485PXFAM75G4E">
      <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" alt="paypal">
  </a>
</p>

### Cryptocurrency

You can add a transaction message with the name of a project or a custom message if your wallet and the blockchain support this

Preferred blockchains:

blockchain | address |  
--- | --- | ---
<a href="javascript:void(0)" style="cursor: default;" alt="Donate via Bitcoin"><img src="https://img.shields.io/badge/-Bitcoin-402607?logo=data:image/svg%2bxml;base64,PHN2ZyBmaWxsPSIjRjc5MzFBIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Qml0Y29pbjwvdGl0bGU+PHBhdGggZD0iTTIzLjYzOCAxNC45MDRjLTEuNjAyIDYuNDMtOC4xMTMgMTAuMzQtMTQuNTQyIDguNzM2QzIuNjcgMjIuMDUtMS4yNDQgMTUuNTI1LjM2MiA5LjEwNSAxLjk2MiAyLjY3IDguNDc1LTEuMjQzIDE0LjkuMzU4YzYuNDMgMS42MDUgMTAuMzQyIDguMTE1IDguNzM4IDE0LjU0OHYtLjAwMnptLTYuMzUtNC42MTNjLjI0LTEuNTktLjk3NC0yLjQ1LTIuNjQtMy4wM2wuNTQtMi4xNTMtMS4zMTUtLjMzLS41MjUgMi4xMDdjLS4zNDUtLjA4Ny0uNzA1LS4xNjctMS4wNjQtLjI1bC41MjYtMi4xMjctMS4zMi0uMzMtLjU0IDIuMTY1Yy0uMjg1LS4wNjctLjU2NS0uMTMyLS44NC0uMmwtMS44MTUtLjQ1LS4zNSAxLjQwN3MuOTc1LjIyNS45NTUuMjM2Yy41MzUuMTM2LjYzLjQ4Ni42MTUuNzY2bC0xLjQ3NyA1LjkyYy0uMDc1LjE2Ni0uMjQuNDA2LS42MTQuMzE0LjAxNS4wMi0uOTYtLjI0LS45Ni0uMjRsLS42NiAxLjUxIDEuNzEuNDI2LjkzLjI0Mi0uNTQgMi4xOSAxLjMyLjMyNy41NC0yLjE3Yy4zNi4xLjcwNS4xOSAxLjA1LjI3M2wtLjUxIDIuMTU0IDEuMzIuMzMuNTQ1LTIuMTljMi4yNC40MjcgMy45My4yNTcgNC42NC0xLjc3NC41Ny0xLjYzNy0uMDMtMi41OC0xLjIxNy0zLjE5Ni44NTQtLjE5MyAxLjUtLjc2IDEuNjgtMS45M2guMDF6bS0zLjAxIDQuMjJjLS40MDQgMS42NC0zLjE1Ny43NS00LjA1LjUzbC43Mi0yLjljLjg5Ni4yMyAzLjc1Ny42NyAzLjMzIDIuMzd6bS40MS00LjI0Yy0uMzcgMS40OS0yLjY2Mi43MzUtMy40MDUuNTVsLjY1NC0yLjY0Yy43NDQuMTggMy4xMzcuNTI0IDIuNzUgMi4wODR2LjAwNnoiLz48L3N2Zz4=" /></a> |  `bc1pjd2c4xcgq978979htc9admycue4nqqhda3vwsc38agked8yya50qz454xc` | 
<a href="javascript:void(0)" style="cursor: default;" alt="Donate via Ethereum"><img src="https://img.shields.io/badge/-Ethereum-6784c7?logo=data:image/svg%2bxml;base64,PHN2ZyBmaWxsPSIjM0MzQzNEIiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+RXRoZXJldW08L3RpdGxlPjxwYXRoIGQ9Ik0xMS45NDQgMTcuOTdMNC41OCAxMy42MiAxMS45NDMgMjRsNy4zNy0xMC4zOC03LjM3MiA0LjM1aC4wMDN6TTEyLjA1NiAwTDQuNjkgMTIuMjIzbDcuMzY1IDQuMzU0IDcuMzY1LTQuMzVMMTIuMDU2IDB6Ii8+PC9zdmc+" /></a> |  `0x176D1b6c3Fc1db5f7f967Fdc735f8267cCe741F3` | <span>![Tether](https://raw.githubusercontent.com/Kukuster/Kukuster/refs/heads/master/tether_20x20.svg)</span> supports USDT ERC-20
<a href="javascript:void(0)" style="cursor: default;" alt="Donate via TRON"><img src="https://img.shields.io/badge/-TRON-5C0E0E?logo=data:image/svg%2bxml;base64,PHN2ZyBmaWxsPSIjRkYwNjBBIiBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDY0IDY0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmMDYwYTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPnRyb248L3RpdGxlPjxnIGlkPSJ0cm9uIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02MS41NSwxOS4yOGMtMy0yLjc3LTcuMTUtNy0xMC41My0xMGwtLjItLjE0YTMuODIsMy44MiwwLDAsMC0xLjExLS42MmwwLDBDNDEuNTYsNywzLjYzLS4wOSwyLjg5LDBhMS40LDEuNCwwLDAsMC0uNTguMjJMMi4xMi4zN2EyLjIzLDIuMjMsMCwwLDAtLjUyLjg0bC0uMDUuMTN2LjcxbDAsLjExQzUuODIsMTQuMDUsMjIuNjgsNTMsMjYsNjIuMTRjLjIuNjIuNTgsMS44LDEuMjksMS44NmguMTZjLjM4LDAsMi0yLjE0LDItMi4xNFM1OC40MSwyNi43NCw2MS4zNCwyM2E5LjQ2LDkuNDYsMCwwLDAsMS0xLjQ4QTIuNDEsMi40MSwwLDAsMCw2MS41NSwxOS4yOFpNMzYuODgsMjMuMzcsNDkuMjQsMTMuMTJsNy4yNSw2LjY4Wm0tNC44LS42N0wxMC44LDUuMjZsMzQuNDMsNi4zNVpNMzQsMjcuMjdsMjEuNzgtMy41MS0yNC45LDMwWk03LjkxLDcsMzAuMywyNiwyNy4wNiw1My43OFoiLz48L2c+PC9zdmc+" /></a> | `TMuNqEgEeBQ2GseWsqgaSdbtqasnJi8ePw` | <span>![Tether](https://raw.githubusercontent.com/Kukuster/Kukuster/refs/heads/master/tether_20x20.svg)</span> supports USDT TRC-20



<details>
  <summary>Alternative options (Ethereum L2, LN, EVM)</summary>
  
  blockchain | address
  --- | ---
  <a href="javascript:void(0)" style="cursor: default;" alt="Donate via Polygon"><img src="https://img.shields.io/badge/-Polygon-2a0c60?logo=data:image/svg%2bxml;base64,PHN2ZyBmaWxsPSIjN0IzRkU0IiByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+UG9seWdvbjwvdGl0bGU+PHBhdGggZD0ibTE3LjgyIDE2LjM0MiA1LjY5Mi0zLjI4N0EuOTguOTggMCAwIDAgMjQgMTIuMjFWNS42MzVhLjk4Ljk4IDAgMCAwLS40ODgtLjg0NmwtNS42OTMtMy4yODZhLjk4Ljk4IDAgMCAwLS45NzcgMEwxMS4xNSA0Ljc4OWEuOTguOTggMCAwIDAtLjQ4OS44NDZ2MTEuNzQ3TDYuNjcgMTkuNjg2bC0zLjk5Mi0yLjMwNHYtNC42MWwzLjk5Mi0yLjMwNCAyLjYzMyAxLjUyVjguODk2TDcuMTU4IDcuNjU4YS45OC45OCAwIDAgMC0uOTc3IDBMLjQ4OCAxMC45NDVhLjk4Ljk4IDAgMCAwLS40ODguODQ2djYuNTczYS45OC45OCAwIDAgMCAuNDg4Ljg0N2w1LjY5MyAzLjI4NmEuOTgxLjk4MSAwIDAgMCAuOTc3IDBsNS42OTItMy4yODZhLjk4Ljk4IDAgMCAwIC40ODktLjg0NlY2LjYxOGwuMDcyLS4wNDEgMy45Mi0yLjI2MyAzLjk5IDIuMzA1djQuNjA5bC0zLjk5IDIuMzA0LTIuNjMtMS41MTd2My4wOTJsMi4xNCAxLjIzNmEuOTgxLjk4MSAwIDAgMCAuOTc4IDB2LS4wMDFaIi8+PC9zdmc+" /></a> |  `0x176D1b6c3Fc1db5f7f967Fdc735f8267cCe741F3`
  <a href="javascript:void(0)" style="cursor: default;" alt="Donate via Base"><img src="https://img.shields.io/badge/-Base-152846?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYzLjYgMzJjMCAxNy40LTE0LjIgMzEuNi0zMS42IDMxLjZDMTUuNSA2My42IDEuOSA1MC45LjUgMzQuN2g0MS43di01LjNILjVDMS45IDEzLjEgMTUuNS40IDMyIC40IDQ5LjUuNCA2My42IDE0LjYgNjMuNiAzMnoiPjwvcGF0aD48L3N2Zz4=" /></a> |  `0x176D1b6c3Fc1db5f7f967Fdc735f8267cCe741F3`
  <a href="javascript:void(0)" style="cursor: default;" alt="Donate via Arbitrum"><img src="https://img.shields.io/badge/-Arbitrum-3F3F3F?logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxuczp4b2RtPSJodHRwOi8vd3d3LmNvcmVsLmNvbS9jb3JlbGRyYXcvb2RtLzIwMDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjUwMCAyNTAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDI1MDA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO30KCS5zdDF7ZmlsbDojMjEzMTQ3O30KCS5zdDJ7ZmlsbDojMTJBQUZGO30KCS5zdDN7ZmlsbDojOURDQ0VEO30KCS5zdDR7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGcgaWQ9IkxheWVyX3gwMDIwXzEiPgoJPGcgaWQ9Il8yNDA1NTg4NDc3MjMyIj4KCQk8cmVjdCBjbGFzcz0ic3QwIiB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIj48L3JlY3Q+CgkJPGc+CgkJCTxnPgoJCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyNiw3NjB2OTgwYzAsNjMsMzMsMTIwLDg4LDE1Mmw4NDksNDkwYzU0LDMxLDEyMSwzMSwxNzUsMGw4NDktNDkwYzU0LTMxLDg4LTg5LDg4LTE1MlY3NjAgICAgICBjMC02My0zMy0xMjAtODgtMTUybC04NDktNDkwYy01NC0zMS0xMjEtMzEtMTc1LDBMMzE0LDYwOGMtNTQsMzEtODcsODktODcsMTUySDIyNnoiPjwvcGF0aD4KCQkJCTxnPgoJCQkJCTxnPgoJCQkJCQk8Zz4KCQkJCQkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNDM1LDE0NDBsLTEyMSwzMzJjLTMsOS0zLDE5LDAsMjlsMjA4LDU3MWwyNDEtMTM5bC0yODktNzkzQzE0NjcsMTQyMiwxNDQyLDE0MjIsMTQzNSwxNDQweiI+PC9wYXRoPgoJCQkJCQk8L2c+CgkJCQkJCTxnPgoJCQkJCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2NzgsODgyYy03LTE4LTMyLTE4LTM5LDBsLTEyMSwzMzJjLTMsOS0zLDE5LDAsMjlsMzQxLDkzNWwyNDEtMTM5TDE2NzgsODgzVjg4MnoiPjwvcGF0aD4KCQkJCQkJPC9nPgoJCQkJCTwvZz4KCQkJCTwvZz4KCQkJCTxnPgoJCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMjUwLDE1NWM2LDAsMTIsMiwxNyw1bDkxOCw1MzBjMTEsNiwxNywxOCwxNywzMHYxMDYwYzAsMTItNywyNC0xNywzMGwtOTE4LDUzMGMtNSwzLTExLDUtMTcsNSAgICAgICBzLTEyLTItMTctNWwtOTE4LTUzMGMtMTEtNi0xNy0xOC0xNy0zMFY3MTljMC0xMiw3LTI0LDE3LTMwbDkxOC01MzBjNS0zLDExLTUsMTctNWwwLDBWMTU1eiBNMTI1MCwwYy0zMywwLTY1LDgtOTUsMjVMMjM3LDU1NSAgICAgICBjLTU5LDM0LTk1LDk2LTk1LDE2NHYxMDYwYzAsNjgsMzYsMTMwLDk1LDE2NGw5MTgsNTMwYzI5LDE3LDYyLDI1LDk1LDI1czY1LTgsOTUtMjVsOTE4LTUzMGM1OS0zNCw5NS05Niw5NS0xNjRWNzE5ICAgICAgIGMwLTY4LTM2LTEzMC05NS0xNjRMMTM0NCwyNWMtMjktMTctNjItMjUtOTUtMjVsMCwwSDEyNTB6Ij48L3BhdGg+CgkJCQk8L2c+CgkJCQk8cG9seWdvbiBjbGFzcz0ic3QxIiBwb2ludHM9IjY0MiwyMTc5IDcyNywxOTQ3IDg5NywyMDg4IDczOCwyMjM0ICAgICAiPjwvcG9seWdvbj4KCQkJCTxnPgoJCQkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xMTcyLDY0NEg5MzljLTE3LDAtMzMsMTEtMzksMjdMNDAxLDIwMzlsMjQxLDEzOWw1NTAtMTUwN2M1LTE0LTUtMjgtMTktMjhMMTE3Miw2NDR6Ij48L3BhdGg+CgkJCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTE1ODAsNjQ0aC0yMzNjLTE3LDAtMzMsMTEtMzksMjdMNzM4LDIyMzNsMjQxLDEzOWw2MjAtMTcwMWM1LTE0LTUtMjgtMTktMjhWNjQ0eiI+PC9wYXRoPgoJCQkJPC9nPgoJCQk8L2c+CgkJPC9nPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=" /></a> |  `0x176D1b6c3Fc1db5f7f967Fdc735f8267cCe741F3`
  <a href="javascript:void(0)" style="cursor: default;" alt="Donate via Avalanche"><img src="https://img.shields.io/badge/-Avalanche-4B2224?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMTUwMyIgaGVpZ2h0PSIxNTA0IiB2aWV3Qm94PSIwIDAgMTUwMyAxNTA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB4PSIyODciIHk9IjI1OCIgd2lkdGg9IjkyOCIgaGVpZ2h0PSI4NDQiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUwMi41IDc1MkMxNTAyLjUgMTE2Ni43NyAxMTY2LjI3IDE1MDMgNzUxLjUgMTUwM0MzMzYuNzM0IDE1MDMgMC41IDExNjYuNzcgMC41IDc1MkMwLjUgMzM3LjIzNCAzMzYuNzM0IDEgNzUxLjUgMUMxMTY2LjI3IDEgMTUwMi41IDMzNy4yMzQgMTUwMi41IDc1MlpNNTM4LjY4OCAxMDUwLjg2SDM5Mi45NEMzNjIuMzE0IDEwNTAuODYgMzQ3LjE4NiAxMDUwLjg2IDMzNy45NjIgMTA0NC45NkMzMjcuOTk5IDEwMzguNSAzMjEuOTExIDEwMjcuOCAzMjEuMTczIDEwMTUuOTlDMzIwLjYxOSAxMDA1LjExIDMyOC4xODQgOTkxLjgyMiAzNDMuMzEyIDk2NS4yNTVMNzAzLjE4MiAzMzAuOTM1QzcxOC40OTUgMzAzLjk5OSA3MjYuMjQzIDI5MC41MzEgNzM2LjAyMSAyODUuNTVDNzQ2LjUzNyAyODAuMiA3NTkuMDgzIDI4MC4yIDc2OS41OTkgMjg1LjU1Qzc3OS4zNzcgMjkwLjUzMSA3ODcuMTI2IDMwMy45OTkgODAyLjQzOCAzMzAuOTM1TDg3Ni40MiA0NjAuMDc5TDg3Ni43OTcgNDYwLjczOEM4OTMuMzM2IDQ4OS42MzUgOTAxLjcyMyA1MDQuMjg5IDkwNS4zODUgNTE5LjY2OUM5MDkuNDQzIDUzNi40NTggOTA5LjQ0MyA1NTQuMTY5IDkwNS4zODUgNTcwLjk1OEM5MDEuNjk1IDU4Ni40NTUgODkzLjM5MyA2MDEuMjE1IDg3Ni42MDQgNjMwLjU0OUw2ODcuNTczIDk2NC43MDJMNjg3LjA4NCA5NjUuNTU4QzY3MC40MzYgOTk0LjY5MyA2NjEuOTk5IDEwMDkuNDYgNjUwLjMwNiAxMDIwLjZDNjM3LjU3NiAxMDMyLjc4IDYyMi4yNjMgMTA0MS42MyA2MDUuNDc0IDEwNDYuNjJDNTkwLjE2MSAxMDUwLjg2IDU3My4wMDQgMTA1MC44NiA1MzguNjg4IDEwNTAuODZaTTkwNi43NSAxMDUwLjg2SDExMTUuNTlDMTE0Ni40IDEwNTAuODYgMTE2MS45IDEwNTAuODYgMTE3MS4xMyAxMDQ0Ljc4QzExODEuMDkgMTAzOC4zMiAxMTg3LjM2IDEwMjcuNDMgMTE4Ny45MiAxMDE1LjYzQzExODguNDUgMTAwNS4xIDExODEuMDUgOTkyLjMzIDExNjYuNTUgOTY3LjMwN0MxMTY2LjA1IDk2Ni40NTUgMTE2NS41NSA5NjUuNTg4IDExNjUuMDQgOTY0LjcwNkwxMDYwLjQzIDc4NS43NUwxMDU5LjI0IDc4My43MzVDMTA0NC41NCA3NTguODc3IDEwMzcuMTIgNzQ2LjMyNCAxMDI3LjU5IDc0MS40NzJDMTAxNy4wOCA3MzYuMTIxIDEwMDQuNzEgNzM2LjEyMSA5OTQuMTk5IDc0MS40NzJDOTg0LjYwNSA3NDYuNDUzIDk3Ni44NTcgNzU5LjU1MiA5NjEuNTQ0IDc4NS45MzRMODU3LjMwNiA5NjQuODkxTDg1Ni45NDkgOTY1LjUwN0M4NDEuNjkgOTkxLjg0NyA4MzQuMDY0IDEwMDUuMDEgODM0LjYxNCAxMDE1LjgxQzgzNS4zNTIgMTAyNy42MiA4NDEuNDQgMTAzOC41IDg1MS40MDIgMTA0NC45NkM4NjAuNDQzIDEwNTAuODYgODc1Ljk0IDEwNTAuODYgOTA2Ljc1IDEwNTAuODZaIiBmaWxsPSIjRTg0MTQyIi8+Cjwvc3ZnPgo=" /></a> |  `0x176D1b6c3Fc1db5f7f967Fdc735f8267cCe741F3`
</details>


