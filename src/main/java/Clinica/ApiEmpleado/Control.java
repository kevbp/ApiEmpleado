package Clinica.ApiEmpleado;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/empleado")
public class Control {

    @Autowired
    private Servicio serv;

    @PostMapping("/grabar")
    public Empleado grabar(@RequestBody Empleado emp) {
        return serv.grabar(emp);
    }

    @GetMapping("/buscar/{id}")
    public Empleado buscar(@PathVariable Long id) {
        return serv.buscar(id);
    }

    @GetMapping("/listar")
    public List<Empleado> listar() {
        return serv.listar();
    }

    @PutMapping("/actualizar/{id}")
    public Empleado actualizar(@PathVariable Long id, @RequestBody Empleado emp) {
        return serv.actualizar(id, emp);
    }

    @DeleteMapping("/eliminar/{id}")
    public void eliminar(@PathVariable Long id) {
        serv.eliminar(id);
    }
}