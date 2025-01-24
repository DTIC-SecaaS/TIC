import React from "react";
import PizZip from "pizzip"; // Biblioteca para manejar archivos ZIP, usada por Docxtemplater para procesar archivos .docx
import Docxtemplater from "docxtemplater"; // Biblioteca para generar documentos Word a partir de plantillas
import { saveAs } from "file-saver"; // Biblioteca para descargar archivos en el navegador
import ImageModule from "docxtemplater-image-module-free"; // Módulo para manejar imágenes en documentos generados con Docxtemplater

/**
 * Convierte una URL de imagen en un buffer Uint8Array.
 * @param {string} url - URL de la imagen a convertir.
 * @returns {Promise<Uint8Array>} - Buffer de la imagen en formato Uint8Array.
 */
async function loadImageAsBuffer(url) {
  const base64String = await urlToBase64(url); // Convierte la URL en una cadena Base64
  const base64Data = base64String.split(",")[1]; // Elimina el prefijo "data:image/png;base64,"
  return Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0)); // Convierte la cadena Base64 en un buffer Uint8Array
}

/**
 * Convierte una URL a una cadena Base64.
 * @param {string} url - URL a convertir.
 * @returns {Promise<string>} - Cadena Base64 que representa el contenido de la URL.
 */
function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    fetch(url) // Realiza una solicitud HTTP para obtener el contenido de la URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar la URL: ${response.status}`); // Maneja errores en la solicitud
        }
        return response.blob(); // Convierte la respuesta en un blob
      })
      .then((blob) => {
        const reader = new FileReader(); // Crea un FileReader para leer el contenido del blob
        reader.onloadend = () => resolve(reader.result); // Cuando se complete la lectura, retorna la cadena Base64
        reader.onerror = reject; // Maneja errores en la lectura del blob
        reader.readAsDataURL(blob); // Lee el blob como una cadena Base64
      })
      .catch((error) => reject(error)); // Maneja errores de la promesa
  });
}

/**
 * Componente de React para generar un documento Word basado en una plantilla y datos dinámicos.
 */
export const GenerateDocx = () => {
  /**
   * Función para generar el documento Word.
   */
  const generateDocument = async () => {
    // Datos dinámicos que serán inyectados en la plantilla
    const data = {
      nombreActivo: "Activo 1",
      ipActivo: "192.168.10.4 o https://nmap.org",
      fechaAnalisis: "10-dic-2024 10:10",
      usuario: "admin",
      showEstado: true,
      estado: "Riesgo Crítico",
      showObservacionEstado: true,
      observacionEstado:
        "Es imperativo tomar medidas inmediatas para mitigar las vulnerabilidades, ya que podrían ser explotadas rápidamente, comprometiendo la integridad y seguridad del activo.",
      showGraficos: true,
      dataEstadistica: [
        {
          severidad: "critico",
          vulnerabilidades: [
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
          ],
        },
        {
          severidad: "alta",
          vulnerabilidades: [
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
          ],
        },
        {
          severidad: "moderada",
          vulnerabilidades: [
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 4,
            },
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
          ],
        },
        {
          severidad: "baja",
          vulnerabilidades: [
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 5,
            },
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
          ],
        },
        {
          severidad: "informativa",
          vulnerabilidades: [
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 2,
            },
            {
              vulnerabilidad: "nombre_vulnerabilidad",
              impacto: 3,
            },
          ],
        },
      ],
      showVulnerabilidadesEncontradas: true,
      vulnerabilidadesEncontradas: [
        {
          nombre: "Vulnerabilidad 1",
          cveAsociado: "CVE-2021-44228",
          descripcion: "Descripcion de la vulnerabilidad 1",
          poc: "solo si hay como, sino no importa xd",
          evaluacionCriticidad: {
            severidad: "Critica",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
        {
          nombre: "Vulnerabilidad 2",
          cveAsociado: "CVE-2021-44228",
          descripcion: "Descripcion de la vulnerabilidad 1",
          poc: "solo si hay como, sino no importa xd",
          evaluacionCriticidad: {
            severidad: "Alta",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
        {
          nombre: "Vulnerabilidad 3",
          cveAsociado: "CVE-2021-44228",
          descripcion: "Descripcion de la vulnerabilidad 1",
          poc: "solo si hay como, sino no importa xd",
          evaluacionCriticidad: {
            severidad: "Moderada",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
        {
          nombre: "Vulnerabilidad 4",
          cveAsociado: "CVE-2021-44228",
          descripcion: "Descripcion de la vulnerabilidad 1",
          poc: "solo si hay como, sino no importa xd",
          evaluacionCriticidad: {
            severidad: "Baja",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
        {
          nombre: "Vulnerabilidad 5",
          cveAsociado: "CVE-2021-44228",
          descripcion: "Descripcion de la vulnerabilidad 1",
          poc: "solo si hay como, sino no importa xd",
          evaluacionCriticidad: {
            severidad: "Informativa",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
      ],
      showDetalleVulnerabilidades: true,
      showCriticas: true,
      vulnerabilidadesCriticas: [
        {
          showNombreCriticas: true,
          nombre: "Vulnerabilidad 1",
          showCveCriticas: true,
          cveAsociado: "CVE-2021-44228",
          showDescripcionCriticas: true,
          descripcion: "Descripcion de la vulnerabilidad 1",
          showPocCriticas: true,
          poc: {
            descripcion: "descripcion",
            image: "https://docxtemplater.com/images/star-3.png",
          },
          showCriticidadCriticas: true,
          evaluacionCriticidad: {
            severidad: "Critica",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          showHerramientasCriticas: true,
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
            {
              nombre: "Nikto",
              version: "1.0.0",
            },
          ],
          showImpactosCriticas: true,
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          showSolucionesCriticas: true,
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          showReferenciasCriticas: true,
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
      ],
      showAltas: true,
      vulnerabilidadesAltas: [
        {
          showNombreAltas: true,
          nombre: "Vulnerabilidad 1",
          showCveAltas: true,
          cveAsociado: "CVE-2021-44228",
          showDescripcionAltas: true,
          descripcion: "Descripcion de la vulnerabilidad 1",
          showPocAltas: true,
          poc: "solo si hay como, sino no importa xd",
          showCriticidadAltas: true,
          evaluacionCriticidad: {
            severidad: "Alta",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          showHerramientasAltas: true,
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          showImpactosAltas: true,
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          showSolucionesAltas: true,
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          showReferenciasAltas: true,
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
      ],
      showModeradas: true,
      vulnerabilidadesModeradas: [
        {
          showNombreModeradas: true,
          nombre: "Vulnerabilidad 1",
          showCveModeradas: true,
          cveAsociado: "CVE-2021-44228",
          showDescripcionModeradas: true,
          descripcion: "Descripcion de la vulnerabilidad 1",
          showPocModeradas: true,
          poc: "solo si hay como, sino no importa xd",
          showCriticidadModeradas: true,
          evaluacionCriticidad: {
            severidad: "Moderada",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          showHerramientasModeradas: true,
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          showImpactosModeradas: true,
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          showSolucionesModeradas: true,
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          showReferenciasModeradas: true,
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
      ],
      showBajas: true,
      vulnerabilidadesBajas: [
        {
          showNombreBajas: true,
          nombre: "Vulnerabilidad 1",
          showCveBajas: true,
          cveAsociado: "CVE-2021-44228",
          showDescripcionBajas: true,
          descripcion: "Descripcion de la vulnerabilidad 1",
          showPocBajas: true,
          poc: "solo si hay como, sino no importa xd",
          showCriticidadBajas: true,
          evaluacionCriticidad: {
            severidad: "Baja",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          showHerramientasBajas: true,
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          showImpactosBajas: true,
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          showSolucionesBajas: true,
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          showReferenciasBajas: true,
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
      ],
      showInformativas: true,
      vulnerabilidadesInformativas: [
        {
          showNombreInformativas: true,
          nombre: "Vulnerabilidad 1",
          showCveInformativas: true,
          cveAsociado: "CVE-2021-44228",
          showDescripcionInformativas: true,
          descripcion: "Descripcion de la vulnerabilidad 1",
          showPocInformativas: true,
          poc: "solo si hay como, sino no importa xd",
          showCriticidadInformativas: true,
          evaluacionCriticidad: {
            severidad: "Informativa",
            razon:
              "Razon del por que es critca. Ej. Es critica porque permite robo de sesiones y datos sensibles",
          },
          showHerramientasInformativas: true,
          herramientas: [
            {
              nombre: "Nmap",
              version: "1.0.0",
            },
          ],
          showImpactosInformativas: true,
          impactos: [
            {
              impacto: "Compromiso completo del servidor",
            },
            {
              impacto: "Robo de datos sensibles",
            },
          ],
          showSolucionesInformativas: true,
          solucionesSugeridas: [
            {
              solucion: "usar consultas parametrizadas",
            },
            {
              solucion: "Implementar un firewall de aplicaciones web",
            },
          ],
          showReferenciasInformativas: true,
          referencias: [
            {
              referencia: "https://nvd.nist.gov/vuln/detail/CVE-2021-44228",
            },
            {
              referencia: "https://logging.apache.org/log4j/2.x/security.html",
            },
          ],
        },
      ],
    };

    try {
      // Cargar la plantilla
      const templateResponse = await fetch("/PlantillaReporteV2.docx");
      if (!templateResponse.ok) {
        throw new Error("No se pudo cargar el archivo template.docx");
      }

      const templateBlob = await templateResponse.blob();
      const templateArrayBuffer = await templateBlob.arrayBuffer();

      const imagesMap = {};
      for (const vuln of data.vulnerabilidadesCriticas) {
        if (vuln.poc?.image) {
          imagesMap[vuln.poc.image] = await loadImageAsBuffer(vuln.poc.image);
        }
      }

      const imageModule = new ImageModule({
        getImage: (tagValue) => {
          if (imagesMap[tagValue]) {
            return imagesMap[tagValue]; // Devuelve el buffer si existe en el mapa
          }
          throw new Error(`No image found for tag ${tagValue}`);
        },
        getSize: () => [400, 250], // Dimensiones de la imagen
      });
      // Leer el archivo y procesarlo con PizZip
      let zip;
      // let imageModule;
      try {
        zip = new PizZip(templateArrayBuffer);
      } catch (error) {
        console.error("Error al cargar PizZip:", error);
        return;
      }

      const doc = new Docxtemplater(zip, {
        modules: [imageModule],
        paragraphLoop: true,
        linebreaks: true,
      });

      // Reemplaza las variables en la plantilla
      doc.setData(data);

      // Renderiza el documento
      doc.render();

      // Genera el archivo
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Descarga el archivo
      saveAs(out, "Reporte_Vulnerabilidades.docx");
    } catch (error) {
      console.error("Error al generar el documento:", error);
    }
  };

  return (
    <button
      onClick={generateDocument}
      style={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        marginLeft: "20px",
      }}
    >
      Generar Documento
    </button>
  );
};
