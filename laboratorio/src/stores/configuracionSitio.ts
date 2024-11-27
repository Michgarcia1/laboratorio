import { defineStore } from 'pinia';
import { ResponseConfiguracionSitio } from 'src/interfaces/Interfaces';

export const configuracionSitio = defineStore('siteConfig', {
  state: () => {
    const siteConfigString = sessionStorage.getItem('siteConfig');
    let parsedSiteConfig = {
      nombre_sitio: '',
      descripcion_sitio: '',
      imagenes_carrusel: [{ imagen: '' }],
      logo: '',
      correo_electronico: '',
      numero_telefonico: '',
      activo: false,
      derechos_reservados: '',
      servicios_clinicos_descripcion: [{
        nombre_servicio: '',
        descripcion: '',
        icono: '',
        activo: false
      }]
    };

    if (siteConfigString) {
      try {
        parsedSiteConfig = JSON.parse(siteConfigString);
      } catch (error) {
        console.error('Error al analizar los datos de sessionStorage:', error);
      }
    }

    return {
      nombre_sitio: parsedSiteConfig.nombre_sitio || '',
      descripcion_sitio: parsedSiteConfig.descripcion_sitio || '',
      imagenes_carrusel: parsedSiteConfig.imagenes_carrusel || [{ imagen: '' }],
      logo: parsedSiteConfig.logo || '',
      derechos_reservados: parsedSiteConfig.derechos_reservados || '',
      correo_electronico: parsedSiteConfig.correo_electronico || '',
      numero_telefonico: parsedSiteConfig.numero_telefonico || '',
      activo: parsedSiteConfig.activo || false,
      servicios_clinicos_descripcion:  parsedSiteConfig.servicios_clinicos_descripcion || [{
        nombre_servicio: '',
        descripcion: '',
        icono: '',
        activo: false
      }]
    };
  },

  actions: {
    setSiteConfig(response: ResponseConfiguracionSitio) {

      const siteConfigToStore = {
        nombre_sitio: response.data.results[0].nombre_sitio,
        descripcion_sitio: response.data.results[0].descripcion_sitio,
        imagenes_carrusel: response.data.results[0].imagenes_carrusel,
        numero_telefonico: response.data.results[0].numero_telefonico,
        correo_electronico: response.data.results[0].correo_electronico,
        derechos_reservados: response.data.results[0].derechos_reservados,
        logo: response.data.results[0].logo,
        activo: response.data.results[0].activo,
        servicios_clinicos_descripcion: response.data.results[0].servicios_clinicos_descripcion

      };

      sessionStorage.setItem('siteConfig', JSON.stringify(siteConfigToStore));

      this.nombre_sitio = siteConfigToStore.nombre_sitio;
      this.descripcion_sitio = siteConfigToStore.descripcion_sitio;
      this.imagenes_carrusel = siteConfigToStore.imagenes_carrusel;
      this.logo = siteConfigToStore.logo;
      this.numero_telefonico = siteConfigToStore.numero_telefonico;
      this.correo_electronico = siteConfigToStore.correo_electronico;
      this.activo = siteConfigToStore.activo;
      this.derechos_reservados = siteConfigToStore.derechos_reservados;
      this.servicios_clinicos_descripcion = siteConfigToStore.servicios_clinicos_descripcion;
    },

    reset() {
      this.nombre_sitio = '';
      this.descripcion_sitio = '';
      this.imagenes_carrusel = [{ imagen: '' }];
      this.logo = '';
      this.activo = false;
      this.numero_telefonico = '';
      this.correo_electronico = '';
      this.derechos_reservados = '';
      this.servicios_clinicos_descripcion = [{
        nombre_servicio: '',
        descripcion: '',
        icono: '',
        activo: false
      }];
      sessionStorage.removeItem('siteConfig');
    },
  },
});
