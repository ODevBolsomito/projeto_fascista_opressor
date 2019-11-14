#define DISTANCE 15
#define DEBUG 0

class Ultrassonico {
    public:
        Ultrassonico(
            int _trigger, 
            int _echo) : trigger(_trigger), 
                         echo(_echo) {}

        void setup();
        bool detected();

    private:
        bool enable;
        int trigger;
        int echo;
};

void Ultrassonico::setup(){
    pinMode(trigger, OUTPUT);
    pinMode(echo, INPUT);
    enable = true;
}

bool Ultrassonico::detected() {
    digitalWrite(trigger, LOW);
    delayMicroseconds(2);
    digitalWrite(trigger, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigger, LOW);
    float distance = pulseIn(echo, HIGH) / 55.2466;
    if(DEBUG) Serial.print(trigger);
    if(DEBUG) Serial.print(" - ");
    if(DEBUG) Serial.println(distance);
    if(distance && distance <= DISTANCE && enable){
        enable = false;
        return true;
    } else {
        return false;
    }
}