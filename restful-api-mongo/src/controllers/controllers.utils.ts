interface CallbackOpts {
    msg?: string;
}

export const defaultCallback = (req: any, res: any) => (
    err: any,
    data: any
) => {
    if(err) {
        res.send(err);
    } 
    res.status(200).json(data);
};

export const optsCallback = (req: any, res: any) => (options: CallbackOpts) => (
    err: any
) => { 
    if(err) {
        res.send(err);
    }
    res.json(options);
};