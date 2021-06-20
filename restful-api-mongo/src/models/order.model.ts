export interface OrderName {
    type: StringConstructor;
    required: string;
}

export interface TotalNumberOfHoles {
    type: number;
    default: 0;
}

export interface TotalSavings {
    type: number;
    default: 0;
}

// export enum PIPE_SIZE {
//     SIZETWO = 2,
//     SIZETHREE = 3,
// }

// export interface PipeSize {
//     type: PipeType[],
//     default: PIPE_SIZE;
// }

// export interface PipeType {
//     type: StringConstructor;
//     enum: typeof PIPE_SIZE;
// }

export interface PipeSize {
    type: number;
    default: 2;
}

export interface OrdersModel {
    name: OrderName;
    numbrOfHoles: TotalNumberOfHoles;
    savings: TotalSavings;
    size: PipeSize;
}