#!/usr/bin/env python3
"""Genera un .docx (Word) con las herramientas del proyecto separadas en
Backend y Frontend, usando solo la biblioteca estandar (zipfile + XML).
No inventa versiones: se toman de pom.xml, package.json y application.properties.
"""
import zipfile
from xml.sax.saxutils import escape

OUT = "docs/Herramientas_TaskFlow.docx"

# --- Datos reales (fuente: pom.xml, package.json, application.properties) ---
backend = [
    ("Java (JDK)", "21", "Lenguaje y runtime del backend"),
    ("Spring Boot", "3.2.3", "Framework de la aplicacion (starter-parent)"),
    ("Spring Web (starter-web)", "3.2.3", "API REST / servidor Tomcat embebido"),
    ("Spring Data JPA (starter-data-jpa)", "3.2.3", "Persistencia y repositorios"),
    ("Hibernate ORM", "6.4.4.Final", "Implementacion JPA / mapeo objeto-relacional"),
    ("PostgreSQL (driver JDBC)", "org.postgresql", "Conexion a la base de datos"),
    ("PostgreSQL (servidor)", "15", "Base de datos relacional (tododb)"),
    ("HikariCP", "incluido en Spring Boot", "Pool de conexiones JDBC"),
    ("Apache Tomcat (embebido)", "10.1.19", "Servidor web / puerto 8080"),
    ("Maven", "3.9.x", "Gestion de dependencias y build"),
    ("spring-boot-starter-test", "3.2.3", "Pruebas (scope test)"),
]

frontend = [
    ("Node.js + npm", "requerido", "Runtime y gestor de paquetes"),
    ("Vite", "^5.1.3", "Servidor de desarrollo y bundler (puerto 5173)"),
    ("React", "^18.2.0", "Libreria de interfaz de usuario"),
    ("React DOM", "^18.2.0", "Renderizado de React en el navegador"),
    ("React Router DOM", "^7.18.2", "Enrutamiento (login, registro, rutas protegidas)"),
    ("@supabase/supabase-js", "^2.111.0", "Cliente de Supabase Auth (login/registro/sesion)"),
    ("Axios", "^1.6.7", "Cliente HTTP hacia el backend"),
    ("@vitejs/plugin-react", "^4.2.1", "Integracion de React con Vite (dev)"),
    ("@types/react", "^18.2.55", "Tipos de React (dev)"),
    ("@types/react-dom", "^18.2.19", "Tipos de React DOM (dev)"),
]


def p(text, bold=False, size=22, color=None, align=None):
    """Un parrafo. size en half-points (22 = 11pt)."""
    rpr = ""
    if bold:
        rpr += "<w:b/>"
    if color:
        rpr += f'<w:color w:val="{color}"/>'
    rpr += f'<w:sz w:val="{size}"/><w:szCs w:val="{size}"/>'
    ppr = ""
    if align:
        ppr = f'<w:pPr><w:jc w:val="{align}"/></w:pPr>'
    return (
        f'<w:p>{ppr}<w:r><w:rPr>{rpr}</w:rPr>'
        f'<w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
    )


def cell(text, bold=False, shade=None, color=None):
    tcpr = '<w:tcPr><w:tcW w:w="0" w:type="auto"/>'
    if shade:
        tcpr += f'<w:shd w:val="clear" w:color="auto" w:fill="{shade}"/>'
    tcpr += "</w:tcPr>"
    rpr = ""
    if bold:
        rpr += "<w:b/>"
    if color:
        rpr += f'<w:color w:val="{color}"/>'
    rpr += '<w:sz w:val="20"/><w:szCs w:val="20"/>'
    return (
        f'<w:tc>{tcpr}<w:p><w:r><w:rPr>{rpr}</w:rPr>'
        f'<w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p></w:tc>'
    )


def table(rows):
    grid = (
        '<w:tblGrid><w:gridCol w:w="3200"/>'
        '<w:gridCol w:w="2400"/><w:gridCol w:w="3600"/></w:tblGrid>'
    )
    borders = (
        '<w:tblBorders>'
        '<w:top w:val="single" w:sz="4" w:color="BBBBBB"/>'
        '<w:left w:val="single" w:sz="4" w:color="BBBBBB"/>'
        '<w:bottom w:val="single" w:sz="4" w:color="BBBBBB"/>'
        '<w:right w:val="single" w:sz="4" w:color="BBBBBB"/>'
        '<w:insideH w:val="single" w:sz="4" w:color="BBBBBB"/>'
        '<w:insideV w:val="single" w:sz="4" w:color="BBBBBB"/>'
        '</w:tblBorders>'
    )
    tblpr = (
        f'<w:tblPr><w:tblW w:w="5000" w:type="pct"/>{borders}'
        '<w:tblLook w:val="04A0"/></w:tblPr>'
    )
    # header
    hdr = (
        "<w:tr>"
        + cell("Herramienta", bold=True, shade="4F46E5", color="FFFFFF")
        + cell("Version", bold=True, shade="4F46E5", color="FFFFFF")
        + cell("Rol en el proyecto", bold=True, shade="4F46E5", color="FFFFFF")
        + "</w:tr>"
    )
    body = ""
    for i, (h, v, r) in enumerate(rows):
        shade = "EEF0FF" if i % 2 == 0 else None
        body += (
            "<w:tr>"
            + cell(h, shade=shade)
            + cell(v, shade=shade)
            + cell(r, shade=shade)
            + "</w:tr>"
        )
    return f"<w:tbl>{tblpr}{grid}{hdr}{body}</w:tbl>"


body_xml = ""
body_xml += p("TaskFlow Scrum", bold=True, size=40, color="4F46E5", align="center")
body_xml += p("Herramientas del proyecto (Backend y Frontend)", bold=True, size=26, align="center")
body_xml += p("Proyecto KAN - Autenticacion segura", size=20, color="666666", align="center")
body_xml += p("")

body_xml += p("Backend", bold=True, size=30, color="4F46E5")
body_xml += p("API REST en Spring Boot que valida JWT y persiste en PostgreSQL.", size=20, color="555555")
body_xml += table(backend)
body_xml += p("")

body_xml += p("Frontend", bold=True, size=30, color="4F46E5")
body_xml += p("SPA en React (Vite) con Supabase Auth para sesion y Axios hacia el backend.", size=20, color="555555")
body_xml += table(frontend)
body_xml += p("")

body_xml += p("Nota: las versiones se tomaron de pom.xml, package.json y application.properties del repositorio. Las marcadas con ^ son rangos de npm (semver).", size=18, color="888888")

document = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
    f"<w:body>{body_xml}"
    '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/>'
    '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>'
    "</w:body></w:document>"
)

content_types = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
    '<Default Extension="xml" ContentType="application/xml"/>'
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
    "</Types>"
)

rels = (
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
    "</Relationships>"
)

with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("[Content_Types].xml", content_types)
    z.writestr("_rels/.rels", rels)
    z.writestr("word/document.xml", document)

print("Generado:", OUT)
