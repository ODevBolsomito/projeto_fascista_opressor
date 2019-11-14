#define DEBUG 0

class LDR {
	private:
		int pin;
		bool enable;
	public:
		LDR(int _pin) : pin(_pin){}
		void setup();
		bool derrubada();
};

void LDR::setup(){
	pinMode(pin, INPUT);
	enable = true;
}

bool LDR::derrubada(){
	if (!enable) return false;

	int val = analogRead(pin);
	if(DEBUG) Serial.println(val);
	if (val > 1020){
		enable = false;
		return true;
	}
	return false;
}