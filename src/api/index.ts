/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ApiMethods,
    HttpClientBaseHeader,
    HttpClientBaseMehod,
    HttpClientBaseStatusCode,
    HttpStatusCode,
  } from "../models/api";
  
  const URL = "http://localhost:11467/api/Movies";
  
  export interface HttpApiClientJSONResponse<T> {
    data: T;
    isOk: boolean;
  }
  
  export class HttpClientBase {
    private resp!: Response;
    private respBody: any;
  
    async createRequest(
      endpoint: string,
      method: HttpClientBaseMehod,
      httpHeader?: HttpClientBaseHeader,
      requestData?: any
    ): Promise<this> {
      const requestInit: RequestInit = {
        method,
      };
  
      if (httpHeader) {
        requestInit.headers = httpHeader as any;
      }
  
      if (requestData) {
        requestInit.body = JSON.stringify(requestData);
      }
  
      this.resp = await fetch(`${URL}/${endpoint}`, requestInit);
      if (method !== "DELETE") {
        this.respBody = await this.resp.json();
      } else {
        this.respBody = this.resp.status;
      }
  
      return this;
    }
  
    statusCode(): HttpClientBaseStatusCode {
      const statusCode = this.resp.status as HttpStatusCode;
      const statusText = HttpStatusCode[
        this.resp.status
      ] as unknown as HttpStatusCode;
  
      return {
        statusCode,
        statusText,
      };
    }
  
    isOk(): boolean {
      return this.resp.ok;
    }
  
    responseByKey<T>(key: string | null = null): T {
      if (key) {
        return this.respBody[key];
      } else {
        return this.respBody;
      }
    }
  
    responseData<T>(): T {
      return this.respBody.data;
    }
  }
  
  export class Api extends HttpClientBase {
    private header: HttpClientBaseHeader;
  
    constructor() {
      super();
      this.header = {
        "Content-Type": "application/json",
      };
    }
  
    async get<T>(url: string): Promise<HttpApiClientJSONResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.GET,
        this.header
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk(),
      };
    }
  
    async post<T>(
      url: string,
      requestData: any
    ): Promise<HttpApiClientJSONResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.POST,
        this.header,
        requestData
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk(),
      };
    }
  
    async put<T>(
      url: string,
      requestData: any
    ): Promise<HttpApiClientJSONResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.PUT,
        this.header,
        requestData
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk(),
      };
    }
  
    async delete<T>(url: string): Promise<HttpApiClientJSONResponse<T>> {
      const request = await this.createRequest(
        url,
        HttpClientBaseMehod.DELETE,
        this.header
      );
  
      return {
        data: request.responseByKey<T>(),
        isOk: request.isOk(),
      };
    }
  }
  
  export const endpoints: ApiMethods = {
    getMovies: "GetMovies",
    getGenders: "GetGenders",
    postMovies: "CreateMovie",
    putMovies: "UpdateMovie",
    deleteMovies: "DeleteMovie",
    deleteMultipleMovies: "DeleteMultipleMovies",
  };
  