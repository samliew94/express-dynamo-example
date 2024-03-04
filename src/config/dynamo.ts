// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
import {
    DynamoDB,
    ListTablesCommand,
    CreateTableCommand,
    DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


const dynamodb = new DynamoDB({ endpoint: "http://localhost:8000" });

const docClient = DynamoDBDocumentClient.from(dynamodb);

const TABLE_GPS_INFO = "GpsInfo";

(async () => {
    try {
        
        await deleteAllTables();
        await createGpsInfoTable();
        await insertMockData();
        await readVehicleId();

       
    } catch (error) {
        console.error(error);
    }
})();

async function deleteAllTables() {

    const { TableNames } = await dynamodb.send(new ListTablesCommand({}));

    if (TableNames?.length) {
        for (const TableName of TableNames) {
            console.log(`deleting table ${TableName}`);

            await dynamodb.send(
                new DeleteTableCommand({
                    TableName,
                })
            );
            console.log("delete tables if they exist...");
        }
    } else {
        console.log("No existing tables found. Skipping table deletion...");
    }
}

async function createGpsInfoTable() {
    console.log(`creating table GpsInfo...`);
    await dynamodb.send(
        new CreateTableCommand({
            TableName: "GpsInfo",
            KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "N" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10,
            },
        })
    );
    console.log("successfully created table GpsInfo");
}

async function insertMockData() {
    
    for (let i = 0; i < 10; i++) {

        const command = new PutCommand({
            TableName: TABLE_GPS_INFO,
            Item: {
                id: i+1,
                coordinates: [
                    0,0
                ],
                timestamp: Date.now(),

            }
        });

        await dynamodb.send(command);

    }

}

async function readVehicleId() {

    for (let id = 1; id <= 10; id++) {

        const command = new GetCommand({
            TableName: TABLE_GPS_INFO,
            Key: {
                id
            }
        })

        const {Item} = await dynamodb.send(command);

        console.log(Item);

    }



}

export default {};
