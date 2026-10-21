import java.util.Scanner;

public class Exercise20 {
    public static void main(String[] args) {
        Scanner keyboard = new Scanner(System.in);
        double balance = 20.0;
        int deposits = 0;
        int withdrawals = 0;
        double amount;
        int option;
        // Repeat the menu until the option is 0
        // 1 Deposit: ask the amount (> 0) and add it
        // 2 Withdraw: ask the amount (> 0); only if there is enough balance
        // 3 Show the balance and both counters
        // 0 Exit. Anything else: invalid option
        keyboard.close();
    }
}
