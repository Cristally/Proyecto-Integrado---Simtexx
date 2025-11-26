import { useState } from "react";
import { createOTBackend } from "../services/otService"; 
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "./CrearOT.css";
import { useNavigate, useParams } from "react-router-dom";

export default function CrearOT() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: "",
    fecha_inicio_contrato: "",
    fecha_fin_contrato: "",
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.titulo.trim()) newErrors.titulo = "El título es obligatorio";
    if (!form.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria";
    if (!form.estado) newErrors.estado = "Debe seleccionar un estado";
    if (!form.fecha_inicio_contrato) newErrors.fecha_inicio_contrato = "Debe ingresar fecha de inicio";
    if (!form.fecha_fin_contrato) newErrors.fecha_fin_contrato = "Debe ingresar fecha de finalización";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({}); 

    const payload = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        estado: form.estado,
        fecha_inicio_contrato: form.fecha_inicio_contrato,
        fecha_fin_contrato: form.fecha_fin_contrato,
        responsable_id: Number(id), 
    };

    try {
        await createOTBackend(payload);
        alert("OT creada con éxito");
        navigate(`/ListaOT/${id}`); 
    } catch (error) {
        console.error(error);
        alert("Error al crear la OT. Revisa la consola.");
    }
  };

  return (
    <>
      <NavBar />

      <div className="container-crearot">
        <h2>Crear Orden de Trabajo</h2>
        <h4>Simtexx Spa</h4>

        <form className="form-box" onSubmit={handleSubmit}>

          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
          />
          {errors.titulo && <p className="error">{errors.titulo}</p>}


          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && <p className="error">{errors.descripcion}</p>}

          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="">Estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
          {errors.estado && <p className="error">{errors.estado}</p>}
          
          <label>Fecha inicio de contrato</label>
          <input 
            type="date" 
            name="fecha_inicio_contrato"
            value={form.fecha_inicio_contrato} 
            onChange={handleChange} 
          />
          {errors.fecha_inicio_contrato && <p className="error">{errors.fecha_inicio_contrato}</p>}

          <label>Fecha finalización de contrato</label>
          <input 
            type="date" 
            name="fecha_fin_contrato"
            value={form.fecha_fin_contrato} 
            onChange={handleChange} 
          />
          {errors.fecha_fin_contrato && <p className="error">{errors.fecha_fin_contrato}</p>}

          <button className="btn-rojo" type="submit" >Crear OT</button>
          <button className="btn-cancelar" type="button" onClick={() => window.history.back()}>
            Cancelar
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}