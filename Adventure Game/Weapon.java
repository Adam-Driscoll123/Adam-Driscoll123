import java.util.ArrayList;
import java.util.Random;

public class Weapon{
    private String name;
    private int maxDamage;
    private String description;    
    private static Weapon knife = new Weapon("Knife", 3, "A rusty dagger with a black rubber handle");
    private static Weapon longsword = new Weapon("Longsword", 5, "A sharp longsword with a red handle and hilt");
    private static Weapon bow = new Weapon("Bow", 4, "A well-crafted silver bow, fletcher included ");
    private static Weapon axe = new Weapon("Axe", 6, "An axe with a black handle; it has a black head with white tips");
    private static ArrayList<Weapon> listOfWeapons;
    private static Random random = new Random();

    Weapon(String name, int maxDamage, String description){
        this.name = name;
        this.maxDamage = maxDamage;
        this.description = description;
        this.listOfWeapons = new ArrayList<>();

        listOfWeapons.add(this);
    }

    //Getters and setters
    public String getName(){ 
        return this.name; }
    public void setName(String name){ 
        this.name = name; }

    public int getMaxDamage(){ 
        return this.maxDamage; }
    public void setMaxDamage(int maxDamage){ 
        this.maxDamage = maxDamage; }

    public String getDescription(){ 
        return this.description; }
    public void setDescription(String description){ 
        this.description = description; }

    public static Weapon randomWeapon(){
        Weapon randomWeapon = listOfWeapons.get(random.nextInt(0, listOfWeapons.size()));
        return randomWeapon;
    }

    @Override
    public String toString() {
        return this.name + " | 0-" + this.maxDamage + " damage | " + this.description;
    }

    public static void arrayTest(){
        for (Weapon weapon : listOfWeapons){
            System.out.println(weapon.getName());
        }
    }
    

}