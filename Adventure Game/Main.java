import java.util.Scanner;

public class Main{
    static Scanner scanner = new Scanner(System.in);
    static Player player = new Player(15, Weapon.randomWeapon());

    public static void main(String args[]){
        player.updateWeapon(Weapon.randomWeapon());
        Weapon.arrayTest();
        initialisePlayer();
        startingArea();
    }

    public static void initialisePlayer(){
        System.out.println("Welcome to my text adventure game! To begin your adventure, please enter your name:"); String name = scanner.nextLine();
        player.setName(name);
        System.out.println("Good to meet you, " + player.getName() + ". Let's begin your adventure. Your given weapon is:\n\n "); player.inspectWeapon();
    }
    public static void startingArea(){
        System.out.println("""
                           You find yourself opposite a bridge, that leads to the next town. There is a troll on the bridge; it hasn't noticed
                           you yet. Looking behind you, there is a forest path. What will you do?

                           1. Fight the troll
                           2. Follow the path
                           3. Check inventory
                           """);
    }
    public static void fightTroll(){
        
    }
}