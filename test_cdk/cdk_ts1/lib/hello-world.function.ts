
import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda'
export const handler = async (event:APIGatewayEvent, context:Context): Promise<APIGatewayProxyResult> =>{
    console.log(`Event: ${JSON.stringify(event,null,2)}`);
    console.log(`Context: ${JSON.stringify(context,null,2)}`);

    return {
        statusCode:200,
        body:JSON.stringify({
            message:"hello world from cdk_ts1 handler",
            event: JSON.stringify(event,null,2),
            context:JSON.stringify(context,null,2)
        }),
    };
};