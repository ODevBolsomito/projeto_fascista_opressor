class LDR {
	private:
		int pin;
		bool acionou;
	public:
		LDR(int _pin) : pin(_pin){}
		void setup();
		bool derrubada();
};

void LDR::setup(){
	pinMode(pin, INPUT);
	acionou = false;
}

bool LDR::derrubada(){
	if (acionou) return false;

	int val = analogRead(pin);
	// Serial.println(val);
	if (val > 800){
		acionou = true;
		return true;
	}
	return false;
}