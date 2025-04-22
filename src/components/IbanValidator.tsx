
import { useState, ChangeEvent } from 'react';
import { formatIban, getValidationMessage } from '@/utils/ibanUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

const IbanValidator = () => {
  const [iban, setIban] = useState('');
  const [formattedIban, setFormattedIban] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIban(input.replace(/\s/g, ''));
    setFormattedIban(formatIban(input));
    
    // Reset validation state when input changes
    if (isSubmitted) {
      const result = getValidationMessage(input);
      setValidationResult(result);
    }
  };

  const handleSubmit = () => {
    const result = getValidationMessage(iban);
    setValidationResult(result);
    setIsSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">IBAN Validator</CardTitle>
        <CardDescription>Enter your IBAN number for validation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Input
              value={formattedIban}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. DE89 3704 0044 0532 0130 00"
              className={`h-12 text-lg font-mono ${
                validationResult?.isValid === true
                  ? 'border-green-500 focus:ring-green-500'
                  : validationResult?.isValid === false
                  ? 'border-red-500 focus:ring-red-500'
                  : ''
              }`}
            />
          </div>

          {validationResult && (
            <div
              className={`flex items-center mt-2 text-sm ${
                validationResult.isValid ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {validationResult.isValid ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 mr-2" />
              )}
              <span>{validationResult.message}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={!iban}
        >
          Validate IBAN
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IbanValidator;
