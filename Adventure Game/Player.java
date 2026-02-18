public class Player{
    private int health;
    private String name;
    private Weapon currentWeapon;
    

    Player(int health, Weapon currentWeapon){
        this.health = 15;
        this.currentWeapon = Weapon.randomWeapon();
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }
    public int getHealth(){
        return this.health;
    }
    public void updateHealth(int update){
        if ((this.health += update)>15) this.health = 15;
        else{this.health += update;}
    }
    public boolean isAlive(){
        return this.health <= 0;
    }
    public void updateWeapon(Weapon weapon) { 
        this.currentWeapon = weapon;
        }
    public Weapon getWeapon(){
        return this.currentWeapon;
    }
    public String inspectWeapon(){
        System.out.println(this.currentWeapon.toString());
        return "\n\n";
    }

    

}