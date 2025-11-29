import { useParams, useNavigate } from "react-router-dom";
import { getOTById } from "../services/otService";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "./DetalleOT.css";

export default function DetalleOT() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ot = getOTById(id);
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));

  // 👉 BASE URL del backend para OT
  const API_URL = "http://localhost:3001/api/ot";

  // 👉 Botón Exportar PDF
  const handleExportPDF = () => {
    window.open(`${API_URL}/${ot.id}/export/pdf`, "_blank");
  };

  // 👉 Botón Exportar CSV/Excel
  const handleExportCSV = () => {
    window.open(`${API_URL}/${ot.id}/export/csv`, "_blank");
  };

  if (!ot) return <h2>OT no encontrada</h2>;

  return (
    <>
      <NavBar />

      <div className="detalle-container">

        <h1 className="titulo">Detalle de Orden</h1>

        {/* ENCABEZADO */}
        <div className="detalle-header">

          <div className="detalle-item">
            <label>Código:</label>
            <span>{ot.id}</span>
          </div>

          <div className="detalle-item">
            <label>Nombre:</label>
            <span>{ot.nombre}</span>
          </div>

          <div className="detalle-item">
            <label>Estado:</label>
            <span>{ot.estado}</span>
          </div>

          <div className="detalle-item">
            <label>Fecha:</label>
            <span>{ot.fechaInicio}</span>
          </div>

          <div className="detalle-item">
            <label>Cliente:</label>
            <span>{ot.cliente}</span>
          </div>

          <div className="detalle-item">
            <label>Responsable:</label>
            <span>{ot.responsable}</span>
          </div>

        </div>

        
        <div className="detalle-main">

          <div className="datos-box">
            <h3>Datos General</h3>

            <div className="datos-grid">
              <div>
                <label>Descripción:</label>
                <p>{ot.descripcion}</p>
              </div>

              <div>
                <label>F. Inicio:</label>
                <p>{ot.fechaInicio}</p>
              </div>

              <div>
                <label>F. Estimada Fin:</label>
                <p>{ot.fechaFin}</p>
              </div>

              <div>
                <label>Estado Actual:</label>
                <p>{ot.estado}</p>
              </div>
            </div>
          </div>

          
          <div className="recursos-box">
            <h3>Recursos Adjuntos</h3>

            <div className="recursos-grid">
              <div className="rcard">
                <span>Imágenes</span>
                <b>{ot.imagenes.length}</b>
              </div>

              <div className="rcard">
                <span>Enlaces</span>
                <b>0</b>
              </div>

              <div className="rcard">
                <span>Archivos</span>
                <b>0</b>
              </div>
            </div>
          </div>

        </div>

        
        <div className="botonera">
          <button onClick={() => navigate(`/ModificarOT/${ot.id}`)}>
            Configurar OT
          </button>

          <button>
            Agregar Recursos
          </button>

          {/* 🔹 Conectados al backend */}
          <button onClick={handleExportPDF}>
            Exportar PDF
          </button>

          <button onClick={handleExportCSV}>
            Exportar CSV
          </button>

          {/* corregido el template string */}
          <button onClick={() => navigate(`/listaOT/${usuario.id}`)}>
            inicio
          </button>
        </div>

        
        <div className="historial-box">
          <h3>Historial de Actualizaciones</h3>

          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Responsable</th>
              </tr>
            </thead>

            <tbody>
              {ot.historial.map((h, i) => (
                <tr key={i}>
                  <td>{h.fecha}</td>
                  <td>{h.msg}</td>
                  <td>{ot.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="comentarios-box">
          <h3>Comentarios</h3>

          <ul>
            {ot.comentarios.map((c, i) => (
              <li key={i}>
                <b>{c.autor}:</b> {c.texto}
              </li>
            ))}
          </ul>

          <button className="btn-add">+</button>
        </div>

      </div>

      <Footer />
    </>
  );
}
