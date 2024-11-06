

export interface ResponseLogin{
  status: number;
  data: {
    access: string;
    refresh: string,
    is_superuser: boolean;
    user_id: number;
  };
}


export interface ResponseRegister {
  status: number;
}


export interface ResponseServiciosClinicos {
  status: number;
  data: {
    results: [
      {
        activo: boolean,
        icono: string,
        nombre_servicio: string,
        precio_unitario_servicio: number
      }
    ]
  }
}

export interface ServicioClinico {
  activo: boolean;
  icono: string;
  nombre_servicio: string;
  precio_unitario_servicio: number;
}


export interface HoraCita {
  label: string,
  value: string,
}
