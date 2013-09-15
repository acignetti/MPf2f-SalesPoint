# MPF2F Sales Point
========

Aplicación Web que actúa de punto de venta.
Se comunica con el webservice MPF2F-WS para realizar operaciones y habilitar pagos.

========

##### Funcionamiento Básico

La aplicación requiere que Ud. se registre para poder comenzar a realizar ventas.
El registro es bien sencillo, solo rellene los datos y siga las instrucciones del asistente.

Una vez registrado, inicie sesión usando los cuadros de texto y el botón Iniciar en la esquina superior derecha.

Al ingresar al sistema, se dispone de las siguientes opciones:

* Ver Transacciones
* Ver Estadísticas (actualmente implementado solo en el WS)
* Generar QR
* Generar NFC (actualmente no implentado)


##### Ver Transacciones

Permite ver las ultimas transacciones pendientes, aprobadas y canceladas.
Para las transacciones pendientes, permite volver a generar el codigo QR

##### Ver Estadísticas

Esta es una opcion para usuarios premium. Actualmente no se encuentra desarrollado, aunque el WS sí permite obtener los datos.
El objetivo es mostrar un pequeño resumen y datos utiles sobre las ventas realizadas.

##### Generar QR y Generar NFC

Estas opciones permiten generar una venta y producir ya sea un codigo QR o uno NFC. El vendedor genera la venta y el usuario mediante el celular, lee el codigo para poder realizar el pago.
Como asunto pendiente está el hecho de confirmar que el pago se efectuo.