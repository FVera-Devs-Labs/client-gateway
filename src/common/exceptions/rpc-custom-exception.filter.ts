import { Catch, RpcExceptionFilter, ArgumentsHost,NotFoundException, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
// export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
export class RpcCustomExceptionFilter implements ExceptionFilter {

  // catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
  catch(exception: RpcException, host: ArgumentsHost){
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    console.log('response',response)

    const rpcError = exception.getError()
    console.log('rpcError',rpcError)

    if(typeof rpcError === 'object' && rpcError !== null && 'status' in rpcError && 'message' in rpcError){
      const errorWithStatus = rpcError as { status: unknown; message: unknown };
      const status = isNaN(Number(errorWithStatus.status)) ? 400 : Number(errorWithStatus.status);
      return response.status(status).json(rpcError)
    }

    response.status(401).json({
      status: 401, 
      message: 'Hola mundo, saludos a todos'
    })
  }
}