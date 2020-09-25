

function validarExcel(arr){

    
	let hayError = false;


    //Chequeo nombres de columnas
	let nombresColumnas=Object.getOwnPropertyNames(arr[1]);
	if(nombresColumnas[1]!='NroTarjeta' || nombresColumnas[2]!='Promoción'){
		hayError=true;
		console.log("Las columnas tienen el nombre mal. Deben llamarse NroTarjeta y Promoción")
	}


    //Chequeo que no haya demasiados valores
	if(arr.length>1000){
		
		hayError=true;
		console.log("El excel tiene demasiados valores");
	}


    arr.forEach((item,index)=>{
      
            
      //Chequeo que todas las filas tengan 2 valores
      if(Object.keys(item).length!=2){
      	
      	hayError=true;
      	console.log("Datos incompletos en la línea "+(index+2));
      	return;
      }

      //Chequeo que todas las filas contengan numeros
      if(!Number.isInteger(item.NroTarjeta) || !Number.isInteger(item.Promocion)){
      	
      	hayError=true;
      	console.log("La línea "+ (index+2) + " continene un valor no numerico o sobra algun espacio");
      	return;
      }   

      //chequeo promociones y reemplazo por su string
      switch(item.Promocion){

      	case 655:
      	item.Promocion='Bonos A';
      	break;

      	case 654:
      	item.Promocion='Bonos B';
      	break;

      	//Agregar nuevas promos aca

      	default:
      	console.log("Promocion no válida en la línea " + (index+2))
      	hayError=true;
      	break;
		return;
      }


    });


    //Si algo esta mal interrumpo el proceso.
   if(hayError){
	 console.log("Se debe corregir excel, proceso interrumpido");
	 process.exit();
   }



}


module.exports=validarExcel;

