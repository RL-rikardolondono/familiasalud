// Catálogo de especialidades y subespecialidades (agrupado)
export const CATALOGO = [
  { g: 'Atención inmediata y medicina general', e: ['Medicina general', 'Medicina general a domicilio', 'Medicina familiar', 'Atención médica en VIH'] },
  { g: 'Pediatría y subespecialidades', e: ['Pediatría', 'Neonatología', 'Neuropediatría', 'Cardiología pediátrica', 'Gastroenterología pediátrica', 'Neumología pediátrica', 'Endocrinología pediátrica', 'Nefrología pediátrica', 'Infectología pediátrica', 'Alergología pediátrica', 'Hemato-oncología pediátrica', 'Cirugía pediátrica', 'Ortopedia infantil'] },
  { g: 'Medicina interna y subespecialidades', e: ['Medicina interna', 'Cardiología', 'Electrofisiología', 'Gastroenterología', 'Hepatología', 'Endocrinología', 'Nefrología', 'Neumología', 'Reumatología', 'Hematología', 'Oncología clínica', 'Infectología', 'Geriatría', 'Alergología', 'Inmunología clínica'] },
  { g: 'Salud de la mujer', e: ['Ginecología y obstetricia', 'Medicina materno-fetal', 'Ginecología oncológica', 'Fertilidad y reproducción', 'Uroginecología', 'Mastología'] },
  { g: 'Cirugía', e: ['Cirugía general', 'Cirugía plástica', 'Cirugía vascular', 'Cirugía de tórax', 'Cirugía cardiovascular', 'Coloproctología', 'Cirugía de cabeza y cuello', 'Neurocirugía', 'Cirugía bariátrica', 'Cirugía de mano'] },
  { g: 'Ortopedia, deporte y rehabilitación', e: ['Ortopedia y traumatología', 'Cirugía de columna', 'Cirugía de rodilla', 'Cirugía de hombro', 'Medicina del deporte', 'Fisiatría', 'Clínica del dolor'] },
  { g: 'Neurología y salud mental', e: ['Neurología', 'Psiquiatría', 'Psiquiatría infantil', 'Psicología', 'Neuropsicología', 'Autismo y neurodivergencia'] },
  { g: 'Ojos, oídos y piel', e: ['Oftalmología', 'Retina y vítreo', 'Glaucoma', 'Oftalmología pediátrica', 'Otorrinolaringología', 'Otología', 'Dermatología', 'Dermatología pediátrica'] },
  { g: 'Urología', e: ['Urología', 'Urología pediátrica', 'Andrología'] },
  { g: 'Odontología', e: ['Odontología general', 'Odontopediatría', 'Ortodoncia', 'Endodoncia', 'Periodoncia', 'Cirugía oral y maxilofacial'] },
  { g: 'Terapias', e: ['Terapia física', 'Terapia ocupacional', 'Terapia del lenguaje', 'Terapia respiratoria', 'Terapia conductual', 'Terapia sensorial'] },
  { g: 'Enfermería, procedimientos y otros', e: ['Enfermería a domicilio', 'Curaciones', 'Sala de procedimientos básicos', 'Vacunación especializada', 'Nutrición y dietética', 'Cuidados paliativos'] }
];
export const ESPECIALIDADES = CATALOGO.flatMap(x => x.e);
export const CIUDADES = ['Bogotá','Medellín','Cali','Barranquilla','Cartagena','Santa Marta','Bucaramanga','Cúcuta','Pereira','Manizales','Armenia','Ibagué','Villavicencio','Montería','Valledupar','Sincelejo','Riohacha','Neiva','Pasto','Popayán','Tunja'];
