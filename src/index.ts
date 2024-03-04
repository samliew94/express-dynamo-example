import express, { Request, Response } from "express";
import dynamo from "./config/dynamo";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!!");
});

app.listen(port, () => {

    // initialize table deletion and creation
    async () => await dynamo;

    console.log(`Server running at http://localhost:${port}`);
});
