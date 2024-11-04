



export interface ResponseLogin{
  status: number;
  data: {
    access: string;
    refresh: string;
  };
}


export interface ResponseRegister {
  status: number;
}
