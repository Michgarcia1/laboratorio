

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

export interface ResultadosCitas{
  nombre_Cita: string;
  total_cita: number;
  pagado: boolean;
  fecha_cita: string;
  hora_cita: string;
  numero_cita: string;
  user: number
  resultados: [
    {
      cita: number;
      archivo: string;
      fecha_subida: string;
    }
  ]
}

export interface ComponenteError {
  numero_error: string;
  mensaje: string;
  url_redirect: string;
  botones?: {
    mensaje: string;
    url_redirect: string;
    onClick?: () => void;
  }[];
}


export interface ResponseConfiguracionSitio {
  status: number;
  data: {
    total_pages: number;
    results: [
      {
        nombre_sitio: string,
        descripcion_sitio: string,
        imagenes_carrusel: { imagen: string }[];
        activo: boolean,
        numero_telefonico: string;
        correo_electronico: string;
        logo: string,
        servicios_clinicos_descripcion: {
          nombre_servicio: string;
          descripcion: string;
          icono: string;
          activo: boolean
        }[];
      }
    ]
  }
}
