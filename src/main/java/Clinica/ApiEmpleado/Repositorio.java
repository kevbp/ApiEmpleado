package Clinica.ApiEmpleado;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Repositorio extends JpaRepository<Empleado, Long> {
    
}

