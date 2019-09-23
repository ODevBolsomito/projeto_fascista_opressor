#define SAMPLES 2
#define MAX_VIBRATIONS 1
#define DEBUG 0
#define INTERVAL 1
#define PAUSE_TIME 1000

class SensorVibracao {
    private:
        int pin;
        int buffer[SAMPLES];
        unsigned long last_time;
        unsigned long pause_time;

    public:
        SensorVibracao(int _pin) : pin(_pin) {}

        void setup();
        bool checkVibration();
        bool vibrou();
        void unshift();
};

void SensorVibracao::setup(){
    pause_time = millis();

    for (int i = 0; i < SAMPLES; ++i)
        buffer[i] = 0;

    pinMode(pin, INPUT);
}

bool SensorVibracao::checkVibration(){
    int switchs = 0;
    int last = buffer[0];
    // Verifica quantas mudanças de estado aconteceram no buffer
    // 0 para 1 ou 1 para 0 ex:
    // 00000000001100000000000001101111110000011111000000
    //           ^ ^            ^ ^^     ^    ^    ^
    // 8 switchs
    for (int i = 0; i < SAMPLES; ++i){
        if (last != buffer[i]){
            switchs++;
        }
        last = buffer[i];
        if(DEBUG)Serial.print(buffer[i]);
    }
    if(DEBUG)Serial.print(" - ");
    if(DEBUG)Serial.print(switchs);
    if(DEBUG)Serial.println();
    if (switchs >= MAX_VIBRATIONS){
        if(!DEBUG){
            pause_time = millis();
            return true;
        } 
    }

    return false;
}

bool SensorVibracao::vibrou(){
    // Verifica o intervalo de tempo minimo
    if(millis() - last_time < INTERVAL || millis() - pause_time < PAUSE_TIME)
        return false;

    // Guarda o tempo da ultima leitura
    last_time = millis();

    // Atualiza o buffer com uma nova leitura 
    // Faz um shift right dos valores
    unshift();

    // Verifica se houve vibração
    return checkVibration();

}

// move os bits para a direita
// adicionando uma nova leitura e removendo a primeira
void SensorVibracao::unshift(){
    int current;
    int last;
    for (int i = 0; i < SAMPLES; ++i){
        current = buffer[i];
        if (i == 0){
            last = buffer[i];
            buffer[i] = digitalRead(pin);
        }
        else{
            buffer[i] = last;
            last = current;
        }
    }
}
