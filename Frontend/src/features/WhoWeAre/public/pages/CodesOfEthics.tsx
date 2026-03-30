import { Container, List, SimpleGrid, Stack, Tabs, Text, Title } from "@mantine/core"
import { Card } from "../components"
import { IconNurse, IconStethoscope, IconWheelchair } from "@tabler/icons-react"

export const CodesOfEthics = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Title order={2}>
                    Códigos Éticos Conductuales
                </Title>

                <Card
                    icon="IconScript"
                    title="Código de Ética"
                    color="green"
                    content={
                        <List spacing="sm">
                            <List.Item>
                                <b>HONESTIDAD:</b> Honraremos el valor de la ética, como marco de toda atención y servicio que se brinde en nuestro Hospital, para que nuestros usuarios tengan confianza sobre la veracidad, autenticidad y calidad de los mismos.
                            </List.Item>

                            <List.Item>
                                <b>LEALTAD:</b> Impulsaremos los valores y virtudes que deben impregnar el trabajo del servidor público y que se fundamentan en el respeto a la vida y en la dignidad de las personas.
                            </List.Item>

                            <List.Item>
                                <b>INFORMACIÓN:</b> Nos comprometeremos a mantener informado al paciente y/o familiares acerca de su padecimiento, tratamiento y su pronóstico; evitando comentarios y acciones que contravengan la veracidad de la misma.
                            </List.Item>

                            <List.Item>
                                <b>GENEROSIDAD:</b> Seremos sensibles ante las necesidades del paciente y le ofreceremos haciéndolo sujeto del más alto beneficio de servicio del hospital.
                            </List.Item>

                            <List.Item>
                                <b>AMABILIDAD:</b> Serviremos a los usuarios y sus familias procurando un trato digno, mostrando una actitud humanitaria, sensible, amigable y cordial.
                            </List.Item>

                            <List.Item>
                                <b>FORMACIÓN E INVESTIGACIÓN:</b> En todas las actividades de enseñanza o de investigación antepondremos el respeto y el bienestar de los pacientes, sobre la ejecución didáctica o de investigación. La investigación se realizará por personal científicamente calificado y la participación del personal becario, bajo la supervisión de personal clínicamente competente.
                            </List.Item>

                            <List.Item>
                                <b>LIDERAZGO:</b> Promoveremos y fomentaremos el valor del compromiso hacia el paciente y hacia el código de ética, con base en el ejemplo personal, contribuyendo a que los valores del mismo sean la base y sustento para que nuestro nosocomio sea reconocido por su competitividad.
                            </List.Item>

                            <List.Item>
                                <b>IGUALDAD:</b> Haremos de la igualdad regla invariable de nuestras actividades y decisiones para la atención de todos, sin distingo de sexo, raza, credo, religión o preferencia política.
                            </List.Item>

                            <List.Item>
                                <b>HONRADEZ:</b> Respetaremos bienes y objetos personales del paciente, sus familiares y de nuestros compañeros de trabajo. Desempeñaremos nuestra labor buscando la satisfacción del usuario, sin solicitar o aceptar compensación o prestación alguna, en dinero o especie por el servicio proporcionado.
                            </List.Item>

                            <List.Item>
                                <b>JUSTICIA:</b> Buscaremos en el ejercicio de nuestras funciones tomar decisiones con un criterio de estricta observancia de la legalidad y el respeto al estado de derecho.
                            </List.Item>
                        </List>
                    }
                />

                <SimpleGrid cols={{ base: 1, md: 2 }}>

                    <Card
                        icon="IconClipboard"
                        title="Carta de los Derechos Generales de Pacientes, Médicos y Enfermería"
                        color="blue"
                        content={
                            <Tabs color="green" defaultValue="pacientes">
                                <Tabs.List grow justify="space-between">
                                    <Tabs.Tab value="pacientes" leftSection={<IconWheelchair size={12} />}>
                                        Pacientes
                                    </Tabs.Tab>
                                    <Tabs.Tab color="blue" value="medicos" leftSection={<IconStethoscope size={12} />}>
                                        Médicos
                                    </Tabs.Tab>
                                    <Tabs.Tab color="violet" value="enfermeros" leftSection={<IconNurse size={12} />}>
                                        Enfermeros y Enfermeras
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="pacientes" p={"xs"}>
                                    <List type="ordered" spacing="sm">
                                        <List.Item>
                                            Recibir atención médica adecuada.
                                        </List.Item>

                                        <List.Item>
                                            Recibir trato digno y respetuoso.
                                        </List.Item>

                                        <List.Item>
                                            Recibir información suficiente, clara, oportuna y veraz.
                                        </List.Item>

                                        <List.Item>
                                            Decidir libremente sobre tu atención.
                                        </List.Item>

                                        <List.Item>
                                            Otorgar o no tu consentimiento válidamente informado.
                                        </List.Item>

                                        <List.Item>
                                            Ser tratado con confidencialidad.
                                        </List.Item>

                                        <List.Item>
                                            Contar con facilidades para obtener una segunda opinión.
                                        </List.Item>

                                        <List.Item>
                                            Recibir atención médica en caso de urgencia.
                                        </List.Item>

                                        <List.Item>
                                            Contar con un expediente clínico.
                                        </List.Item>

                                        <List.Item>
                                            Ser atendido cuando se inconforme por la atención recibida.
                                        </List.Item>
                                    </List>
                                </Tabs.Panel>

                                <Tabs.Panel value="medicos" p={"xs"}>
                                    <List type="ordered" spacing="sm">
                                        <List.Item>
                                            Ejercer la profesión en forma libre y sin presiones de cualquier naturaleza.
                                        </List.Item>

                                        <List.Item>
                                            Laborar en instalaciones apropiadas y seguras que garanticen su práctica profesional.
                                        </List.Item>

                                        <List.Item>
                                            Tener a su disposición los recursos que requiere su práctica profesional.
                                        </List.Item>

                                        <List.Item>
                                            Abstenerse de garantizar resultados en la atención médica.
                                        </List.Item>

                                        <List.Item>
                                            Recibir trato respetuoso por parte de los pacientes y sus familiares, así como del personal relacionado con su trabajo profesional.
                                        </List.Item>

                                        <List.Item>
                                            Tener acceso a educación médica continua y ser considerado en igualdad de oportunidades para su desarrollo profesional.
                                        </List.Item>

                                        <List.Item>
                                            Tener acceso a actividades de investigación y docencia en el campo de su profesión.
                                        </List.Item>

                                        <List.Item>
                                            Asociarse para promover sus intereses profesionales.
                                        </List.Item>

                                        <List.Item>
                                            Salvaguardar su prestigio profesional.
                                        </List.Item>

                                        <List.Item>
                                            Percibir remuneración por los servicios prestados.
                                        </List.Item>
                                    </List>
                                </Tabs.Panel>

                                <Tabs.Panel value="enfermeros" p={"xs"}>
                                    <List type="ordered" spacing="sm" >
                                        <List.Item>
                                            Ejercer la Enfermería con libertad, sin presiones de cualquier naturaleza y en igualdad de condiciones interprofesionales.
                                        </List.Item>

                                        <List.Item>
                                            Desempeñar sus intervenciones en un entorno que garantice la seguridad e integridad personal y profesional.
                                        </List.Item>

                                        <List.Item>
                                            Contar con los recursos necesarios que les permitan el óptimo desempeño de sus funciones.
                                        </List.Item>

                                        <List.Item>
                                            Abstenerse de proporcionar información que sobrepase su competencia profesional y laboral.
                                        </List.Item>

                                        <List.Item>
                                            Recibir trato digno por parte de pacientes y sus familiares, así como del personal relacionado con su trabajo, independientemente del nivel jerárquico.
                                        </List.Item>

                                        <List.Item>
                                            Tener acceso a diferentes alternativas de desarrollo profesional en igualdad de oportunidades que los demás profesionales de la salud.
                                        </List.Item>

                                        <List.Item>
                                            Tener acceso a las actividades de gestión, docencia e investigación de acuerdo a sus competencias, en igualdad de oportunidades interprofesionales.
                                        </List.Item>

                                        <List.Item>
                                            Asociarse libremente para impulsar, fortalecer y salvaguardar sus intereses profesionales.
                                        </List.Item>

                                        <List.Item>
                                            Acceder a posiciones de toma de decisión de acuerdo a sus competencias, en igualdad de condiciones que otros profesionistas, sin discriminación alguna.
                                        </List.Item>

                                        <List.Item>
                                            Percibir remuneración por los servicios profesionales prestados.
                                        </List.Item>
                                    </List>
                                </Tabs.Panel>
                            </Tabs>
                        }
                    />

                    <Card
                        icon="IconNurse"
                        title="Código de Ética para Enfermería"
                        color="violet"
                        content={
                            <List type="ordered" spacing="sm">
                                <List.Item>
                                    Respetar y cuidar la vida y los derechos humanos, manteniendo una conducta honesta y leal en el cuidado de las personas.
                                </List.Item>

                                <List.Item>
                                    Proteger la integridad de las personas ante cualquier afectación, otorgando cuidados de enfermería libres de riesgo.
                                </List.Item>

                                <List.Item>
                                    Mantener una relación estrictamente profesional con las personas que atiende, sin distinción de raza, clase social, creencia religiosa y preferencia política.
                                </List.Item>

                                <List.Item>
                                    Asumir la responsabilidad como miembro del equipo de salud, enfocando los cuidados hacia la conservación de la salud y prevención del daño.
                                </List.Item>

                                <List.Item>
                                    Guardar el secreto profesional observando los límites del mismo, ante riesgo o daño a la propia persona o terceros.
                                </List.Item>

                                <List.Item>
                                    Procurar que el entorno laboral sea seguro tanto para las personas, sujeto de la atención de enfermería, como para quienes conforman el equipo de salud.
                                </List.Item>

                                <List.Item>
                                    Evitar la competencia desleal y compartir con estudiantes y colegas experiencias y conocimientos en beneficio de las personas y de la comunidad de enfermería.
                                </List.Item>

                                <List.Item>
                                    Asumir el compromiso responsable de actualizar y aplicar los conocimientos científicos, técnicos y humanísticos de acuerdo a su competencia profesional.
                                </List.Item>

                                <List.Item>
                                    Pugnar por el desarrollo de la profesión y dignificar su ejercicio.
                                </List.Item>

                                <List.Item>
                                    Fomentar la participación y el espíritu de grupo para lograr fines profesionales.
                                </List.Item>
                            </List>
                        }
                    />

                    <Card
                        icon="IconFaceMask"
                        title="Derechos de los Pacientes con VIH"
                        color="yellow"
                        content={
                            <List type="ordered" spacing="sm">
                                <List.Item>
                                    Estar informados e informar a sus parejas sexuales, ya que también es un derecho de ellas y su responsabilidad.
                                </List.Item>

                                <List.Item>
                                    Ser tratados como personas y defender sus derechos de respeto, solidaridad, amor y ayuda.
                                </List.Item>

                                <List.Item>
                                    Recibir la atención médica adecuada y oportuna, con calidad y calidez.
                                </List.Item>

                                <List.Item>
                                    A continuar en su escuela o trabajo aunque los demás sepan de su enfermedad.
                                </List.Item>

                                <List.Item>
                                    A guardar el secreto ante quienes consideren necesario.
                                </List.Item>

                                <List.Item>
                                    A no ser condicionados para trabajar, subir en transportes públicos, viajar, ingresar a un hospital, tienda, centro de diversiones, cines o cualquier otro lugar público.
                                </List.Item>

                                <List.Item>
                                    A no ser obligados, ni obligar a nadie a tener relaciones sexuales.
                                </List.Item>

                                <List.Item>
                                    A usar y que se usen medidas preventivas como el condón.
                                </List.Item>

                                <List.Item>
                                    A recibir ayuda integral, física, médica y psicológica.
                                </List.Item>

                                <List.Item>
                                    A ser tratados bien dentro de su familia.
                                </List.Item>

                                <List.Item>
                                    A expresar sus sentimientos, miedos y temores ante los demás, sin ser juzgados negativamente.
                                </List.Item>

                                <List.Item>
                                    A asumir sus responsabilidades, como parejas, esposos, padres o cualquier otro papel social que desempeñen en la vida.
                                </List.Item>

                                <List.Item>
                                    A denunciar las amenazas, violencia o discriminación ejercidas hacia ellos y ver que procedan como se haría con cualquier otra persona.
                                </List.Item>

                                <List.Item>
                                    A defender y ser respetados en sus preferencias sexuales.
                                </List.Item>
                            </List>
                        }
                    />

                    <Card
                        icon="IconDna2"
                        title="Código de Bioética para el Personal de Salud"
                        color="cyan"
                        content={
                            <List type="ordered" spacing="sm">
                                <List.Item>
                                    Proporcionar lo mejor de sus conocimientos y destrezas en beneficio de los pacientes, con interés genuino de mantener su salud y bienestar, con trato amable, respetuoso, prudente y tolerante.
                                </List.Item>

                                <List.Item>
                                    Participar en actividades que contribuyan al beneficio de la salud de la comunidad y en la atención médica en casos de emergencias y desastres.
                                </List.Item>

                                <List.Item>
                                    Mantener e incrementar la confianza de sus pacientes y del personal a su cargo.
                                </List.Item>

                                <List.Item>
                                    Aplicar medidas pertinentes y profesionalmente aceptadas en caso de que el paciente o su familiar estén incapacitados para tomar decisiones.
                                </List.Item>

                                <List.Item>
                                    Proporcionar el seguimiento de los pacientes durante enfermedades crónicas o agudas y no abandonarlos mientras dure la enfermedad o hasta que se rehabiliten.
                                </List.Item>

                                <List.Item>
                                    El prestador de servicios de salud es responsable de sus enfermos y debe estar disponible para atenderlos.
                                </List.Item>
                            </List>
                        }
                    />
                </SimpleGrid>

                <Card
                    title="Decálogo de los Derechos de los Cirujanos Dentistas"
                    icon="IconDental"
                    color="red"
                    content={
                        <List type="ordered" spacing="sm">
                            <List.Item>
                                Gozar de reconocimiento y prerrogativas iguales a otros profesionales del ámbito de la salud.
                            </List.Item>

                            <List.Item>
                                Ejercer la profesión en forma libre y sin presiones de cualquier naturaleza.
                            </List.Item>

                            <List.Item>
                                Recibir trato digno y respetuoso por parte de toda persona relacionada con su trabajo profesional.
                            </List.Item>

                            <List.Item>
                                No garantizar resultado cierto en la atención brindada, salvo en los casos expresamente pactados.
                            </List.Item>

                            <List.Item>
                                Laborar en instalaciones apropiadas y seguras que garanticen su práctica profesional.
                            </List.Item>

                            <List.Item>
                                Contar con acceso a la actualización profesional y ser considerado en igualdad de oportunidades para su desarrollo profesional.
                            </List.Item>

                            <List.Item>
                                Participar en actividades de investigación y docencia.
                            </List.Item>

                            <List.Item>
                                Salvaguardar su prestigio profesional.
                            </List.Item>

                            <List.Item>
                                Asociarse para promover sus intereses profesionales.
                            </List.Item>

                            <List.Item>
                                Recibir en forma oportuna los horarios, salarios y emolumentos que le correspondan por los servicios prestados.
                            </List.Item>
                        </List>
                    }
                />

                <Card
                    title="Carta de Obligaciones de los Servidores Públicos"
                    icon="IconFriends"
                    color="indigo"
                    content={
                        <>
                            <Text>
                                <b>I.</b> Como servidor público buscaré salvaguardar los principios de
                                legalidad, honradez, lealtad, imparcialidad y eficiencia en el desempeño de
                                mis funciones.
                            </Text>
                            <Text mt="md" mb="sm">
                                <b>II.</b> Manifiesto que mis principales <b>OBLIGACIONES</b> como servidor
                                público son:
                            </Text>

                            <List type="ordered" spacing="sm" pl={50}>
                                <List.Item>
                                    Abstenerme de cualquier acto u omisión que cause la suspensión o deficiencia
                                    de un servicio, o implique el incumplimiento de disposiciones jurídicas, abuso
                                    o ejercicio indebido.
                                </List.Item>

                                <List.Item>
                                    Custodiar y cuidar los documentos e información que tenga bajo mi cuidado,
                                    observando las leyes de transparencia y acceso a la información pública, de
                                    archivos y de protección de datos personales.
                                </List.Item>

                                <List.Item>
                                    Observar buena conducta, trato respetuoso, diligente, imparcial y con rectitud
                                    para con los ciudadanos.
                                </List.Item>

                                <List.Item>
                                    Proporcionar en forma oportuna y veraz la información y datos solicitados por
                                    la Comisión de los Derechos Humanos del Distrito Federal, observando las
                                    disposiciones jurídicas y administrativas aplicables.
                                </List.Item>

                                <List.Item>
                                    Utilizar los recursos humanos asignados para los fines legales
                                    correspondientes y, en su caso, denunciar los actos u omisiones de éstos que
                                    puedan ser causa de responsabilidad.
                                </List.Item>

                                <List.Item>
                                    No seleccionar, contratar, nombrar, designar o promover a personas que estén
                                    legalmente inhabilitadas para el servicio público o cuando ello genere ventaja
                                    o beneficio personal, familiar o de negocios.
                                </List.Item>

                                <List.Item>
                                    Dirigir al personal a mi cargo con reglas de trato adecuadas y abstenerme de
                                    incurrir en agravio, desviación o abuso de autoridad, así como de autorizar
                                    inasistencias sin causa justificada o licencias, permisos o comisiones
                                    indebidas.
                                </List.Item>

                                <List.Item>
                                    Mostrar actitud institucional y de respeto hacia mi superior jerárquico,
                                    atendiendo las disposiciones que dicte legítimamente o, en su caso, exponer
                                    las dudas sobre la procedencia de las órdenes.
                                </List.Item>

                                <List.Item>
                                    Utilizar de manera responsable y eficiente los recursos presupuestales y
                                    materiales asignados para los fines legales correspondientes.
                                </List.Item>

                                <List.Item>
                                    Formular y ejecutar los planes, programas y presupuestos correspondientes,
                                    cumpliendo con las normas en materia de gasto público.
                                </List.Item>

                                <List.Item>
                                    Abstenerme de solicitar, aceptar u obtener beneficios adicionales a mi
                                    contraprestación, ya sea dinero, objetos, donaciones, empleo, cargo o
                                    comisión, contrarios a la norma, para mí o para personas con las que tenga o
                                    haya tenido relaciones familiares o de negocios.
                                </List.Item>

                                <List.Item>
                                    Abstenerme o excusarme de intervenir en asuntos, contratos, adquisiciones u
                                    obras públicas cuando exista conflicto de intereses o interés particular que
                                    genere beneficios personales, familiares o de negocios.
                                </List.Item>

                                <List.Item>
                                    Reportar a la Contraloría General del Distrito Federal, de forma periódica y
                                    veraz, los bienes de mi patrimonio mediante la declaración de situación
                                    patrimonial.
                                </List.Item>

                                <List.Item>
                                    Atender con diligencia las instrucciones, requerimientos y resoluciones que,
                                    conforme a la norma, reciba de la Contraloría General del Distrito Federal.
                                </List.Item>

                                <List.Item>
                                    Abstenerme de desempeñar otros empleos, cargos o comisiones, oficiales o
                                    particulares, prohibidos por la ley.
                                </List.Item>

                                <List.Item>
                                    Abstenerme de presentarme, identificarme o pretender ejercer como servidor
                                    público cuando ya no esté desempeñando estas funciones.
                                </List.Item>
                            </List>
                        </>
                    }
                />
            </Stack>
        </Container >
    )
}