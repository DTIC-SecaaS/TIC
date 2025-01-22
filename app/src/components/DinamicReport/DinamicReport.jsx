// // src/components/ReportEditor.jsx
// import React, { useState, useEffect } from "react";
// import TemplateSelector from "./TemplateSelector";
// import ReportPreview from "./ReportPreview";
// import ExportButton from "./ExportButton";
// import templates from "../../templates/templates.json";
// import RichTextEditor from "./RichTextEditor";

// const DinamicReport = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [reportData, setReportData] = useState({});
//   const [content, setContent] = useState([]); // Contenido editable

//   useEffect(() => {
//     if (selectedTemplate) {
//       // Inicializar contenido editable basado en la plantilla
//       const editableContent = selectedTemplate.sections.map((section) => ({
//         ...section,
//         content: section.content || "", // Prellenar con contenido predeterminado
//       }));
//       setContent(editableContent);
//     }
//   }, [selectedTemplate]);

//   const handleContentChange = (index, newContent) => {
//     const updatedContent = [...content];
//     updatedContent[index].content = newContent;
//     setContent(updatedContent);
//   };

//   return (
//     <div>
//       <h1>Editor de Reportes Avanzado</h1>
//       <TemplateSelector templates={templates} onSelect={setSelectedTemplate} />
//       {content.length > 0 &&
//         content.map((section, index) => (
//           <RichTextEditor
//             key={index}
//             section={section}
//             onChange={(newContent) => handleContentChange(index, newContent)}
//           />
//         ))}
//       <ReportPreview content={content} />
//       <ExportButton content={content} />
//     </div>
//   );
// };

// export default DinamicReport;
// src/components/Editor.js
// src/components/Editor.js
import React, { useEffect, useState } from "react";

const DinamicReport = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
    >
      <div style={{ width: "48%", padding: "10px", border: "1px solid #ccc" }}>
        <h1>Editor de Reportes</h1>
      </div>
    </div>
  );
};

export default DinamicReport;
