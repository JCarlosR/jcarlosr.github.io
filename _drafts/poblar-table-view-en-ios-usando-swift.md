En esta entrada vamos a ver cómo poblar un UITableView en iOS usando Swift.

> ¿Pero por qué una tabla?, yo solo quiero hacer una lista.

Si te estás preguntando eso, déjame decirte que este es el elemento nativo de iOS para hacer listas.

Pasos a seguir
---

Lo que haremos será:

- Insertar una TableView en nuestro Storyboard.
- Obtener una referencia de esta TableView en nuestra "custom class" que hayamos creado para nuestro ViewController.
- .

En resumen vamos a hacer que estos 2 componentes trabajen en conjunto, mostrando el PickerView solo cuando el usuario ha decidido escoger una nueva opción.

Ambos elementos van a estar enlazados.

Lo que sigue es opcional, pero es lo que haremos para que nuestro ejemplo esté completo.

- En una clase por separada vamos a poblar el pickerView.
- Y a detectar el evento de selección de un nuevo valor.

Entrando en materia
---

Ya hemos descrito lo que haremos.

Veamos ahora los archivos de código que nuestro proyecto va a contener.

Tendremos un grupo con las siguientes clases:

- CountryPickerViewAdapter
- Country

Como te debes estar imaginando, en este ejemplo **vamos a poblar nuestro pickerView con una lista de países**.

Esta lista la vamos a mostrar en una pantalla de registro.

Es decir, estamos en un formulario de registro y uno de los campos debe permitir al usuario seleccionar su país.

Por tanto en nuestro **RegisterViewController** vamos a instanciar la clase pickerViewAdapter.

Y así mismo a crear nuestro pickerView usando código:

{% highlight swift %}
var countryPickerAdapter = CountryPickerViewAdapter()
var countryPickerView: UIPickerView! = UIPickerView()
{% endhighlight %}

Un Adaptador para nuestro PickerView
---
Si definiste los 2 atributos antes mencionados, de seguro que obtuviste un error sobre ```CountryPickerViewAdapter```.

Esto es porque aun no hemos definido dicha clase.

Para hacerlo, sobre el grupo que has creado, dale clic derecho y selecciona "New File".

En este ejemplo, el grupo se llama "country", y aquí vamos a crear una clase que sea "Subclass of NSObject".

Repetimos los mismos pasos y ahora creamos una clase llamada Country, que representa a nuestro modelo (una clase con los atributos que un país tiene).

Así tenemos:

{% highlight swift %}
class CountryPickerViewAdapter: NSObject, UIPickerViewDataSource, UIPickerViewDelegate {
    
    weak var delegate: CountrySelectedDelegate?
    
    var countries: [Country] = []
    
    func add(country: Country) {
        countries.append(country)
    }
    
    func getFirstOption() -> Country {
        return countries[0]
    }
    

    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return countries.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return countries[row].descripcion
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        delegate?.newCountryWasSelected(countryName: countries[row].descripcion, countryId: countries[row].idPais)
    }
    
}


protocol CountrySelectedDelegate: class {
    func newCountryWasSelected(countryName: String, countryId: String)
}
{% endhighlight %}

Y nuestra clase Country:

{% highlight swift %}
class Country: NSObject {
    var id: String = ""
    var name: String = ""
}
{% endhighlight %}

Asociar nuestro PickerViewAdapter con el ViewController que lo va a usar
---

En este caso ```RegisterViewController``` debe implementar el protocolo ```CountrySelectedDelegate```. 

De esta forma, cuando se detecte la selección de un país, el PickerViewAdapter va a comunicar el evento al ViewController correspondiente, a través de un delegado.

De esta forma, en nuestro ```RegisterViewController``` vamos a definir el método **newCountryWasSelected** de la siguiente manera:

{% highlight swift %}
func newCountryWasSelected(countryName: String, countryId: String) {
    // set the selected option
    self.txtCountry.text = countryName
    
    // and hide the picker view
    self.view.endEditing(false)
}
{% endhighlight %}

Gracias a esto el usuario ve en el TextField la opción que ha escogido, y el pickerView se oculta.

Asociar el PickerView con el TextField
---

Todo lo anterior no va a funcionar si nos saltamos este paso que es el más importante:

Asociar el PickerView que hemos creado "programáticamente" con el TextField que pusimos en nuestro Storyboard, y del cuál obtuvimos una referencia.

En nuestro método ```viewDidLoad``` llamaremos al método ```loadCountries```.

Aquí vamos a asociar el PickerView con el TextField y a poblar el PickerView.

De esta manera:

{% highlight swift %}
func loadCountries()
{
    let urlRequest = Global.urlContries
    
    Alamofire.request(urlRequest).responseJSON { response in
        print("Countries result:", response.result) // result
        
        if let result = response.result.value {
            let arrayData: NSArray =  result as! NSArray
            for countryData: NSDictionary in arrayData as! [NSDictionary] {
                let country = Country()
                country.idPais = countryData["idPais"]! as! String
                country._descripcion = countryData["Descripcion"]! as! String
                self.countryPickerViewAdapter.add(country: country)
                self.countryPickerView.reloadAllComponents()
            }
            
            let firstCountry: Country = self.countryPickerViewAdapter.getFirstOption()
            self.txtCountry.text = firstCountry.descripcion
            self.selectedCountryId = firstCountry.idPais
        }
    }
    
    // Source & delegate for PickerView
    countryPickerView.dataSource = countryPickerViewAdapter
    countryPickerView.delegate = countryPickerViewAdapter
    // Bind with the proper textField
    txtCountry.inputView = countryPickerView
    // To propagate the selection event
    countryPickerViewAdapter.delegate = self
}
{% endhighlight %}
