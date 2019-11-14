#define NAO_INICIADO 0 
#define INICIADO 1


class Plataforma {
	private:
		int pin;
		int state;
	public:
		Plataforma(int _pin) : pin(_pin){
			state = NAO_INICIADO;
		}
		void setup();
		bool largou();
		bool chegou();
};

void Plataforma::setup(){
	pinMode(pin, OUTPUT);
}

bool Plataforma::largou(){
	if(state == NAO_INICIADO and digitalRead(pin) == 0){
		state = INICIADO;
		return true;
	}
	return false;
}
bool Plataforma::chegou(){
	if(state == INICIADO and digitalRead(pin) == 1){
		state = NAO_INICIADO;
		return true;
	}
	return false;
}