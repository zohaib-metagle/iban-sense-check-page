
import { useState, ChangeEvent, useCallback } from 'react';
import { formatIban, getValidationMessage, getCountryFromIban } from '@/utils/ibanUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Copy, FileCheck } from 'lucide-react';
import { toast } from 'sonner';
import IbanHistory from './IbanHistory';
import ReactCountryFlag from "react-country-flag";

const IbanValidator = () => {
  const [iban, setIban] = useState('');
  const [formattedIban, setFormattedIban] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setIban(input.replace(/\s/g, ''));
    setFormattedIban(formatIban(input));
    
    if (isSubmitted) {
      const result = getValidationMessage(input);
      setValidationResult(result);
    }
  };

  const handleSubmit = () => {
    const result = getValidationMessage(iban);
    setValidationResult(result);
    setIsSubmitted(true);

    if (result.isValid) {
      // Save to history if valid
      const history = JSON.parse(localStorage.getItem('ibanHistory') || '[]');
      if (!history.includes(formattedIban)) {
        const newHistory = [formattedIban, ...history].slice(0, 5); // Keep last 5
        localStorage.setItem('ibanHistory', JSON.stringify(newHistory));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedIban);
      toast.success('IBAN copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy IBAN');
    }
  };

  const handleHistorySelect = (selectedIban: string) => {
    setIban(selectedIban.replace(/\s/g, ''));
    setFormattedIban(selectedIban);
    const result = getValidationMessage(selectedIban);
    setValidationResult(result);
    setIsSubmitted(true);
  };

  const countryCode = getCountryFromIban(iban);

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">IBAN Validator</CardTitle>
        <CardDescription>Enter your IBAN number for validation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <div className="relative">
              <Input
                value={formattedIban}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="e.g. DE89 3704 0044 0532 0130 00"
                className={`h-12 text-lg font-mono pl-12 ${
                  validationResult?.isValid === true
                    ? 'border-green-500 focus:ring-green-500'
                    : validationResult?.isValid === false
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }`}
              />
              {countryCode && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <ReactCountryFlag
                    countryCode={countryCode}
                    svg
                    style={{
                      width: '1.2em',
                      height: '1.2em',
                    }}
                    title={countryCode}
                  />
                </div>
              )}
            </div>
            
            {validationResult && (
              <div
                className={`flex items-center mt-2 text-sm ${
                  validationResult.isValid ? 'text-green-600' : 'text-red-600'
                } animate-fade-in`}
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

          {validationResult?.isValid && (
            <div className="flex justify-end gap-2 animate-fade-in">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy IBAN
              </Button>
            </div>
          )}
          
          <IbanHistory onSelect={handleHistorySelect} />
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
