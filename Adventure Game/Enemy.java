public class Enemy{
    private String species;
    private int health;
    private int maxDamage;

    Enemy(String species, int health, int maxDamage){
        this.species = species;
        this.health = health;
        this.maxDamage = maxDamage;
    }

    public String getSpecies(){
        return this.species; }
        
    public int getHealth(){
        return this.health; }
    public void updateHealth(int update){
        if ((this.health += update)>15) this.health = 15;
        else{this.health += update;} }

    public boolean isAlive(){ 
        return this.health <= 0; 
        }
}