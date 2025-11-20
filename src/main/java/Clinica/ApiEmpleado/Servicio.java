package Clinica.ApiEmpleado;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Servicio {

    @Autowired
    private Repositorio repo;

    public Empleado grabar(Empleado emp) {
        return repo.save(emp);
    }

    public Empleado buscar(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Empleado> listar() {
        return repo.findAll();
    }

    public Empleado actualizar(Long id, Empleado emp) {
        return repo.findById(id).map(e -> {
            e.setNom(emp.getNom());
            e.setCar(emp.getCar());
            return repo.save(e);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
