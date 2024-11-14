

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
    total_pages: number;
    results: [
      {
        activo: boolean,
        icono: string,
        nombre_servicio: string,
        precio_unitario_servicio: number,
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

export interface CitasMedicas extends Omit<ResponseServiciosClinicos, 'data'> {
  data: {
    total_pages: number;
    results: {
      nombre_Cita: string;
      total_cita: number;
      pagado: boolean;
      fecha_cita: string;
      hora_cita: string;
      numero_cita: string;
      user: number
      folio_cita: [
        {
          cita: number;
          archivo: string;
          fecha_subida: string;
        }
      ]
    }[];
  };
}

export interface ResultadosCitas extends Omit<ResponseServiciosClinicos, 'data'> {
  nombre_Cita: string;
  total_cita: number;
  pagado: boolean;
  fecha_cita: string;
  hora_cita: string;
  numero_cita: string;
  user: number
  folio_cita: [
    {
      cita: number;
      archivo: string;
      fecha_subida: string;
    }
  ]
}
