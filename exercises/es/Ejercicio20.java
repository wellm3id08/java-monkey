import java.util.Scanner;

public class Ejercicio20 {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);
        double saldo = 20.0;
        int ingresos = 0;
        int retiradas = 0;
        double importe;
        int opcion;
        // Repite el menú hasta que la opción sea 0
        // 1 Ingresar: pide el importe (> 0) y súmalo
        // 2 Retirar: pide el importe (> 0); solo si hay saldo suficiente
        // 3 Mostrar el saldo y los dos contadores
        // 0 Salir. Cualquier otra: opción no válida
        teclado.close();
    }
}
