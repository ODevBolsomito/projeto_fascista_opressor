#define PAUSE_TIME 1000
#define DISTANCE 15
#define DEBUG 1

class Ultrassonico {
    public:
        Ultrassonico(
            int _trigger, 
            int _echo) : trigger(_trigger), 
                         echo(_echo) {}

        void setup();
        bool detected();

    private:
        int trigger;
        int echo;
        unsigned long pause_time;
};

void Ultrassonico::setup(){
    pinMode(trigger, OUTPUT);
    pinMode(echo, INPUT);
    pause_time = millis();
}

bool Ultrassonico::detected() {
    digitalWrite(trigger, LOW);
    delayMicroseconds(2);
    digitalWrite(trigger, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigger, LOW);
    float distance = pulseIn(echo, HIGH);
    if(DEBUG) Serial.print(trigger);
    if(DEBUG) Serial.print(" - ");
    if(DEBUG) Serial.println(distance);
    if(distance && distance <= DISTANCE && millis() - pause_time > PAUSE_TIME){
        pause_time = millis();
        return true;
    } else {
        return false;
    }
}