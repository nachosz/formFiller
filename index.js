const puppeteer = require('puppeteer');

const parseoExcel = require('./parseoExcel');


(async function() {
    //Elijo el excel especificando la ruta
    let arrPromos=await parseoExcel('promociones.xlsx');
    


    //Abro el navegador en la pagina de login
    const browser = await puppeteer.launch({headless:false});
	const page = await browser.newPage();
	await page.goto('URL de login');

	//Cambio la medida de la pantalla
	await page.setViewport({ width: 980, height: 722 });

    
	//Login
    const txtUsuario = await page.$('#txtUsername');
    const txtPassword = await page.$('#txtPassword');
    const btnContinuar= await page.$('#btnContinuar');

    await txtUsuario.click();
    await page.keyboard.type('Usuario');

    await txtPassword.click();
    await page.keyboard.type('Contraseña');

    await btnContinuar.click();
    await page.waitForNavigation();//El wait for navigation espera que la pagina este completamente cargada para poder seleccionar el próximo nodo.
    
    //Navegacion
    const btn1 = await page.$('#idbtn1');
    await btn1.click();
    await page.waitForNavigation();

    //Navegacion
    const btn2= await page.$('#idbtn2');
    await btn2.click();
    await page.waitForNavigation();

    //Navegacion
    const btn3 = await page.$('#idbtn3');
    await btn3.click();
    await page.waitForNavigation();

	
    //Llenado en loop
	for(let promo of arrPromos){

	    
		try{

		    //Escribo nro tarjeta
		    const txtTarjeta = await page.$('#MainContent_txtNroTarjeta');
		    await page.type('#MainContent_txtNroTarjeta',promo.NroTarjeta);

		    
		    //Click en buscar
		    const btnBuscar = await page.$('#MainContent_btnBuscar');
		    await btnBuscar.click();
		    await page.waitForNavigation();


		    //Click en la lupita(no tiene id)
		   	await page.mouse.click(896,446);
		    await page.waitForNavigation();


		    //Agrego promo
		    const btnAgregarPromo = await page.$('#MainContent_btnAgregarPromo');
		    await btnAgregarPromo.click();
		    await page.waitForNavigation();

		    //Selecciono promo
		    const selectorPromos = await page.$('#MainContent_cmbPromociones');
		    await selectorPromos.click();
		    await page.keyboard.type(promo.Promoción);

		    //Guardo Promo
		    const btnGuardar = await page.$('#MainContent_Button4');
		    await btnGuardar.click();
		    await page.waitForNavigation();

		    //Volver y loop
		    const btnVolver = await page.$('#MainContent_Button1');
		    await btnVolver.click();
		    await page.waitForNavigation();

		}


		catch (error) {
	            console.log(error);
	    }


	}

	//Cierro el navegador cuando termino
    await browser.close();


}());


